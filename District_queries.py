# list of district specific queries
# each method only contains one district query
# driver is the query selector
# only Fiscal year 2019 queries used

def AG():
    result = '''
            WITH "file:///input_file_current.csv" AS input
            LOAD CSV WITH HEADERS FROM input AS row
            CREATE (:FullTransaction {District_Name: row.District_Name, Fiscal_Year: toInteger(row.Fiscal_Year), Fund_Code: row.Fund_Code, Object_Code: toInteger(row.Object_Code), School_Code: row.SchoolCode, Function_Code: row.FunctionCode, Program_Code: row.Program_Code, Account_Name: row.Account_Name, Date: date(datetime(apoc.date.parse(row.Date, "ms", "MM/dd/YYYY"))), Description: row.Description, Amount: toFloat(row.amount)})
            '''
    return result


def Aleutain():
    result = '''
            WITH "file:///input_file_current.csv" AS input
            LOAD CSV WITH HEADERS FROM input AS row
            CREATE (:FullTransaction {District_Name: row.District_Name, Fiscal_Year: toInteger(row.Fiscal_Year), Fund_Code: row.Fund_Code, Object_Code: toInteger(row.Object_Code), School_Code: row.SchoolCode, Function_Code: row.FunctionCode, Program_Code: row.Program_Code, Account_Name: row.Account_Name, Date: date(datetime(apoc.date.parse(row.Date, "ms", "MM/dd/YYYY"))), TransactionNo: toInteger(row.TransactionNo), Journal: row.Journal, Description: row.Description, Absolute_Amount: toFloat(row.absolute_amount), Credit_Flag: row.Credit_Flag, Amount: toFloat(row.amount)})
            '''
    return result


def Annette():
    result = '''
            WITH "file:///input_file_current.csv" AS input
            LOAD CSV WITH HEADERS FROM input AS row
            CREATE (:FullTransaction {District_Name: row.District_Name, Fiscal_Year: toInteger(row.Fiscal_Year), Fund_Code: row.Fund_Code, School_Code: row.School_Code, Function_Code: row.Function_Code, Program_Code: row.Program_Code, Object_Code: toInteger(row.Object_Code), Date: date(datetime(apoc.date.parse(row.Date, "ms", "MM/dd/YYYY"))), Julian_Date: row.julian_date, Account_Name: row.account_name, Debit: toFloat(row.Debit), Credit: toFloat(row.Credit), Amount: toFloat(row.amount), Reference: row.Reference, Description: row.description, Voucher_Number: toInteger(row.Voucher_Number), PO_Number: toInteger(row.PO_Number), Order_Type: row.Order_Type, Invoice_Number: toInteger(row.Invoice_Number), Vendor_Name: row.Vendor_Name, Bank_Account: row.Bank_Account, Check_Number: toInteger(row.Check_Number), Deposit_Number: toInteger(row.Deposit_Number), Ship_Number: toInteger(row.Ship_Number), User: row.User, Approved: row.Approved, Originator: row.Originator, Memo: row.Memo})
            '''
    return result


def BeringStrait():
    result = '''
            WITH "file:///input_file_current.csv" AS input
            LOAD CSV WITH HEADERS FROM input AS row
            CREATE (:FullTransaction {District_Name: row.District_Name, Fiscal_Year: toInteger(row.Fiscal_year), Fund_Code: row.Fund_Code, School_Code: row.School_Code, Function_Code: row.Function_Code, Program_Code: row.Program_Code, Object_Code: toInteger(row.Object_Code), Account_Name: row.Account_Name, Description: row.Description, Budget: row.Budget, Encumbrance: toFloat(row.Encumbrance), Amount: toFloat(row.Amount), Date: date(datetime(apoc.date.parse(row.Date, "ms", "MM/dd/YYYY"))), Reference_Type: row.Reference_Type, Reference:  row.Reference, Check_Key: row.Check_Key, Claim_No: row.Claim_No, Received_From: row.Received_From, Vendor_Number: toInteger(row.Vendor_Number), Vendor_Name: row.Vendor_Name, Invoice_Number: row.Invoice_Number, Batch_Year: row.Batch_Year, BatchNo: row.BatchNo})
            '''
    return result


def Chugach():
    result = '''
            WITH "file:///input_file_current.csv" AS input
            LOAD CSV WITH HEADERS FROM input AS row
            CREATE (:FullTransaction {District_Name: row.District_Name, Fiscal_Year: toInteger(row.Fiscal_Year), Fund_Code: row.Fund_Code, School_Code: row.School_Code, Function_Code: row.Function_Code, Program_Code: row.Program_Code, Object_Code: toInteger(row.Object_Code), Date: date(datetime(apoc.date.parse(row.Date, "ms", "MM/dd/YYYY"))), Julian_Date: row.julian_date, Account_Name: row.account_name, Debit: toFloat(row.Debit), Credit: toFloat(row.Credit), Amount: toFloat(row.amount), Reference: row.Reference, Description: row.description, Voucher_Number: toInteger(row.Voucher_Number), PO_Number: toInteger(row.PO_Number), Order_Type: row.Order_Type, Invoice_Number: toInteger(row.Invoice_Number), Vendor_Name: row.Vendor_Name, Bank_Account: row.Bank_Account, Check_Number: toInteger(row.Check_Number), Deposit_Number: toInteger(row.Deposit_Number), Ship_Number: toInteger(row.Ship_Number), User: row.User, Approved: row.Approved, Originator: row.Originator, Memo: row.Memo})
            '''
    return result


def CopperRiver():
    result = '''
            WITH "file:///input_file_current.csv" AS input
            LOAD CSV WITH HEADERS FROM input AS row
            CREATE (:FullTransaction {District_Name: row.District_Name, Fiscal_Year: toInteger(row.Fiscal_year), Fund_Code: row.Fund_Code, School_Code: row.School_Code, Function_Code: row.Function_Code, Program_Code: row.Program_Code, Object_Code: toInteger(row.Object_Code), Account_Name: row.Account_Name, Description: row.Description, Budget: row.Budget, Encumbrance: toFloat(row.Encumbrance), Amount: toFloat(row.Amount), Date: date(datetime(apoc.date.parse(row.Date, "ms", "MM/dd/YYYY"))), Reference_Type: row.Reference_Type, Reference:  row.Reference, Check_Key: row.Check_Key, Claim_No: row.Claim_No, Received_From: row.Received_From, Vendor_Number: toInteger(row.Vendor_Number), Vendor_Name: row.Vendor_Name, Invoice_Number: row.Invoice_Number, Batch_Year: row.Batch_Year, BatchNo: row.BatchNo})
            '''
    return result


def Cordova():
    result = '''
            WITH "file:///input_file_current.csv" AS input
            LOAD CSV WITH HEADERS FROM input AS row
            CREATE (:FullTransaction {District_Name: row.District_Name, Account_Name: row.Account_Name, V_Counter: row.V_Counter, Description: row.Description, Debit: toInteger(row.Debit), Credit: toInteger(row.Credit), Reference_Type: row.Reference_Type, Reference: toInteger(row.Reference), Check_Key: row.Check_Key, Claim_No: toInteger(row.Claim_No), Received_From: row.Received_From, Vendor_Number: toInteger(row.Vendor_Number), Vendor_Name: row.Vendor_Name, Invoice_Number: row.Invoice_Number, BatchNo: toInteger(row.BatchNo), Cancel_Flag: row.Cancel_Flag, CP_Dummy: row.CP_Dummy, Unnamed_19: row.Unnamed_19, Fiscal_Year: toInteger(row.Fiscal_Year), Fund_Code: row.Fund_Code, Object_Code: toInteger(row.Object_Code), Function_Code: row.Function_Code, Program_Code: row.Program_Code, School_Code: row.School_Code})
            '''
    return result


def Craig():
    result = '''
            WITH "file:///input_file_current.csv" AS input
            LOAD CSV WITH HEADERS FROM input AS row
            CREATE (:FullTransaction {District_Name: row.District_Name, Fiscal_Year: toInteger(row.Fiscal_Year), Vendor_ID: row.Vendor_ID, Vendor_Name: row.Vendor_Name, Invoice_Number: row.Invoice_Number, Date: date(datetime(apoc.date.parse(row.Date, "ms", "MM/dd/YYYY"))), Site: row.Site, PO_Number: row.PO_Number, Description: row.Description, Fund_Code: row.Fund_Code, Program_Code: row.Program_Code, Function_Code: row.Function_Code, Object_Code: toInteger(row.Object_Code), Account_Name: row.Account_Name, Amount: toFloat(row.Amount)})
            '''
    return result


def DeltaGreely():
    result = '''
            WITH "file:///input_file_current.csv" AS input
            LOAD CSV WITH HEADERS FROM input AS row
            CREATE (:FullTransaction {District_Name: row.District_Name, Fiscal_Year: toInteger(row.Fiscal_year), Fund_Code: row.Fund_Code, School_Code: row.School_Code, Function_Code: row.Function_Code, Program_Code: row.Program_Code, Object_Code: toInteger(row.Object_Code), Account_Name: row.Account_Name, Description: row.Description, Budget: row.Budget, Encumbrance: toFloat(row.Encumbrance), Amount: toFloat(row.Amount), Date: date(datetime(apoc.date.parse(row.Date, "ms", "MM/dd/YYYY"))), Reference_Type: row.Reference_Type, Reference:  row.Reference, Check_Key: row.Check_Key, Claim_No: row.Claim_No, Received_From: row.Received_From, Vendor_Number: toInteger(row.Vendor_Number), Vendor_Name: row.Vendor_Name, Invoice_Number: row.Invoice_Number, Batch_Year: row.Batch_Year, BatchNo: row.BatchNo})
            '''
    return result


def KakeCity():
    result = '''
            WITH "file:///input_file_current.csv" AS input
            LOAD CSV WITH HEADERS FROM input AS row
            CREATE (:FullTransaction {District_Name: row.District_Name, Fiscal_Year: toInteger(row.Fiscal_Year), Fund_Code: row.Fund_Code, School_Code: row.School_Code, Function_Code: row.Function_Code, Program_Code: row.Program_Code, Object_Code: toInteger(row.Object_Code), Account_Name: row.Account_Name, Date: date(datetime(apoc.date.parse(row.Date, "ms", "MM/dd/YYYY"))), ID_Number: toInteger(row.ID_Number), Journal_Number: row.Journal_Number, Journal: row.Journal, PO_Number: row.PO_Number, Description: row.Description, Amount: toFloat(row.Amount), Debit: toFloat(row.Debit), Credit: toFloat(row.Credit) })
            '''
    return result


def NAB():
    result = '''
            WITH "file:///input_file_current.csv" AS input
            LOAD CSV WITH HEADERS FROM input AS row
            CREATE (:FullTransaction {District_Name: row.District_Name, Fiscal_Year: toInteger(row.Fiscal_Year), Fund_Code: row.Fund_Code, School_Code: row.School_Code, Function_Code: row.Function_Code, Program_Code: row.Program_Code, Object_Code: toInteger(row.Object_Code), Date: date(datetime(apoc.date.parse(row.Date, "ms", "MM/dd/YYYY"))), Description: row.Description, Debit: toFloat(row.Debit), Credit: toFloat(row.Credit), Amount: toFloat(row.Amount), Journal: row.Journal, PO_Number: row.PO_Number, Invoice_Number: toInteger(row.Invoice_Number), Vendor_Name: row.Vendor_Name, Check_Number: row.Check_Number, Pay_Period: row.Pay_Period, Post_Type: row.Post_Type })
            '''
    return result


def Petersburg():
    result = '''
            WITH "file:///input_file_current.csv" AS input
            LOAD CSV WITH HEADERS FROM input AS row
            CREATE (:FullTransaction {District_Name: row.District_Name, Fiscal_Year: toInteger(row.Fiscal_Year), Fund_Code: row.Fund_Code, School_Code: row.School_Code, Function_Code: row.Function_Code, Program_Code: row.Program_Code, Object_Code: toInteger(row.Object_Code), Account_Name: row.Account_Name, Reference_Number: row.Reference_Number, Requisition_Number: row.Requisition_Number, PO_Number: row.PO_Number, Description: row.Description, Exclude1: row.Exclude1, Exclude2: row.Exclude2, Name: row.Name, Exclude3: row.Exclude3, Journal: row.Journal, Amount: toFloat(row.Amount) })
            '''
    return result


def Valdez():
    result = '''
            WITH "file:///input_file_current.csv" AS input
            LOAD CSV WITH HEADERS FROM input AS row
            CREATE (:FullTransaction {District_Name: row.District_Name, Fiscal_Year: toInteger(row.Fiscal_Year), Fund_Code: row.Fund_Code, Org: row.Org, Account: row.Account, Object_Code: toInteger(row.Object_Code), Project: row.Project, Doc_Line_Number: row.Doc_Line_Number, Description: row.Description, Invoice_Date: date(datetime(apoc.date.parse(row.Invoice_Date, "ms", "MM/dd/YYYY"))), Date: date(datetime({epochmillis: apoc.date.parse(row.Date, "ms", "MM/dd/YYYY")})), Period: toInteger(row.Period), Vendor_Name: row.Vendor_Name, Amount: toFloat(row.Amount) })
            '''
    return result


def Yupiit():
    result = '''
            WITH "file:///input_file_current.csv" AS input
            LOAD CSV WITH HEADERS FROM input AS row
            CREATE (:FullTransaction {District_Name: row.District_Name, Fiscal_Year: toInteger(row.Fiscal_Year), Fund_Code: row.Fund_Code, Org: row.Org, Account: row.Account, Object_Code: toInteger(row.Object_Code), Project: row.Project, Doc_Line_Number: row.Doc_Line_Number, Description: row.Description, Invoice: row.Invoice, Date: date(datetime(apoc.date.parse(row.Date, "ms", "MM/dd/YYYY"))), Period: toInteger(row.Period), Vendor_Name: row.Vendor_Name, Amount: toFloat(row.Amount) })
            '''
    return result


def Juneau():
    result = '''
             WITH "file:///input_file_current.csv" AS input
             LOAD CSV WITH HEADERS FROM input AS row
             CREATE (:FullTransaction {District_Name: row.District_Name, Fiscal_Year: toInteger(row.Fiscal_Year), Fund_Code: row.Fund_Code, Throwaway_Code: row.Throwaway_Code, School_Code:row.School_Code, Function_Code: row.Function_Code, Program_Code: row.Program_Code, Object_Code: toInteger(row.Object_Code), Object_Suffix: row.Object_Suffix, Account_Name: row.AccountDesc, Date: date(datetime(apoc.date.parse(row.JournalDate, "ms", "MM/dd/YYYY"))), Reference: row.Reference, Vendor_Name: row.VendorName, BatchNo: toInteger(row.BatchNo), Journal: row.Transaction, Credit: toFloat(row.CreditAmount), Debit: toFloat(row.DebitAmount)});
             '''
    return result


def districtList(district):
    d_list = {
        "Alaska Gateway School District": AG(),
        "Aleutian Region School District": Aleutain(),
        "Annette Island School District": Annette(),
        "Bering Strait School District": BeringStrait(),
        "Chugach School District": Chugach(),
        "Copper River School District": CopperRiver(),
        "Cordova City School District": Cordova(),
        "Craig City School District": Craig(),
        "Delta / Greely School District": DeltaGreely(),
        "Juneau Borough School District": Juneau(),
        "Kake City School District": KakeCity(),
        "Northwest Arctic Borough School District": NAB(),
        "Petersburg Borough School District": Petersburg(),
        "Valdez City School District": Valdez(),
        "Yupiit School District": Yupiit()
    }
    return d_list[district]
