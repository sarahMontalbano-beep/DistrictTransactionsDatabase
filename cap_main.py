# Brian Jore; 02/22/2022
# Main project driver

import cleaning_files
import Query_list
import os

#driver
def main():
    print("Current working directory: {0}".format(os.getcwd()))
    x = input("Enter the file name: ")
    y = input("Enter the school district: ")
    z = input("Enter the fiscal year: ")
    cleaning_files.cleaner(x, y, z)
    Query_list.queryDriver(y)

if __name__ == '__main__':
    main()
