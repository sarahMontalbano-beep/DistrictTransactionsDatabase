# Author: Brian Jore; 01/25/2022
# Script for cleaning csv files.
import pandas as pd
import os
from pathlib import Path

# formatting input file as dataframe
df = pd.DataFrame


# step 1: remove text above column headers and standardizing column headers
def headers(df):
    df.columns = df.columns.str.title()


# step 2: fill null date values with first date of fiscal year and format date column
def missingFisc(df, dc, fiscalYear):
    fisc = dc   # isolating date column and formatting as MM/DD/YYYY
    f_null = fisc.notnull() # returns false for all null values
    iyear = int(fiscalYear) - 1
    for i in range(len(f_null)):
        if not f_null[i]:
            fisc[i] = "07/01/" + str(iyear)
            print("null filled.")
        i += 1
    print("missing dates filled.")


# looking for date column and formatting if present
def dateCol(df, fiscal):
    cols = df.columns
    if cols.__contains__("Journal Date"):
        date = df["Journal Date"]
        missingFisc(df, date, fiscal)
    elif cols.__contains__("Date"):
        date = df["Date"]
        missingFisc(df, date, fiscal)
    elif cols.__contains__("Invoice Date"):
        date = df["Invoice Date"]
        missingFisc(df, date, fiscal)
    else:
        print("No date column.")


# step 3: check for $ in amount or debit columns
def symbol(x):
    if isinstance(x, str):
        return(x.replace('$',''))
    return x


def charCheck(df):
    cols = df.columns
    if "Debit" in cols:
        df["Debit"] = df["Debit"].apply(symbol).astype('float')
        pos = df.columns.get_loc("Debit")
        df["Credit"] = df["Credit"].abs()      # converting credit column to absolute values
        df["Amount"] = df["Debit"] - df["Credit"]  # subtracting debit from credit
        target = df.pop('Amount')
        df.insert(pos, "Amount", target)
    elif "Amount" in cols:
        df["Amount"] = df["Amount"].apply(symbol).astype('float')
    elif "Amount" and "Debit" in cols:
        df["Amount"] = df["Amount"].apply(symbol).astype('float')
        df["Debit"] = df["Debit"].apply(symbol).astype('float')
    print("Money columns cleaned")


# step 4: formatting account number
def accountNum(df, district, fiscalYear):
    #isolating account number
    if df.columns.__contains__("Account No"):
        acc = df["Account No"]
        a_name = "Account No"
    elif df.columns.__contains__("Account Number"):
        acc = df["Account Number"]
        a_name = "Account Number"
    temp = acc[0]    #looking at first cell of Account No
    # determining how long the account number is
    dashes = temp.__contains__('-')
    dots = temp.__contains__('.')
    deliminator = ''
    if dashes:
        deliminator = '-'
    elif dots:
        deliminator = '.'

    numDel = temp.count(deliminator)
    print(numDel)
    if numDel == 2:
        df[["Fund_Code","Function_Code","Object_Code"]] = acc.str.split(deliminator, expand=True)
        df.drop(columns=a_name, inplace=True)
        df.insert(0,"Fiscal_Year",fiscalYear, allow_duplicates=True)
        if df.columns.__contains__("School_District"):
            df.rename({"School_District": "District_Name"}, axis='columns')
        else:
            df.insert(0, "District_Name", district, allow_duplicates=True)
    elif numDel == 4:
        df[["Fund_Code","School_Code","Function_Code","Program_Code","Object_Code"]] = acc.str.split(deliminator, expand=True)
        df.drop(columns=a_name, inplace=True)
        df.insert(0,"Fiscal_Year",fiscalYear, allow_duplicates=True)
        if df.columns.__contains__("School_District"):
            df.rename({"School_District": "District_Name"}, axis='columns')
        else:
            df.insert(0, "District_Name", district, allow_duplicates=True)
    elif numDel > 4:
        if numDel == 6:
            df[["Fiscal_Year","Fund_Code","Throwaway_Code","School_Code","Function_Code","Program_Code","Object_Code"]] = acc.str.split(deliminator, expand=True)
            df.drop(columns=a_name, inplace=True)
        else:
            df[["Fiscal_Year","Fund_Code","School_Code","Function_Code","Program_Code","Object_Code"]] = acc.str.split(deliminator, expand=True)
            df.drop(columns=a_name, inplace=True)
        # filling in fiscal
        fy_col = df["Fiscal_Year"].__len__()
        if fy_col == 0:
            df["Fiscal_Year"].ffill(fiscalYear)

        codelen = df["Object_Code"].__len__()
        if codelen > 3:
            df["Object_Suffix"] = df["Object_Code"].str[3:4]
            df["Object_Code"] = df["Object_Code"].str[0:3]     # splitting object code
        df.insert(0, "District_Name", district, allow_duplicates=True)
        print("column inserted")


# reading in excel file and running cleaning functions.
def cleaner(file_name, district, year):
    print("Current working directory: {0}".format(os.getcwd()))
    file_path = Path('C:\\Users\\eBay User\\Documents\\CLASSES\\CSCI483\\DistrictTransactionsDatabase\\backend\\public\\')
    # location of primary test DB
    output_path = Path('C:\\Users\\eBay User\\Documents\\CLASSES\\CSCI483\\DistrictTransactionsDatabase\\backend\\public\\output_file.csv')
    if os.getcwd() == file_path:
        print("Already there!")
        imported = pd.read_excel(file_name)
    else:
        print("Changing directory!")
        os.chdir(file_path)
        imported = pd.read_excel(file_name)
    input_file = pd.DataFrame(imported)
    print("file imported.")
    headers(input_file)
    dateCol(input_file, year)
    charCheck(input_file)
    accountNum(input_file, district, year)
    input_file.to_csv(output_path)      # creating backup of file
    print("file cleaned.")
