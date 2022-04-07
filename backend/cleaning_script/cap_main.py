# Brian Jore; 02/22/2022
# Main project driver
import sys

import cleaning_files
import query_list


# driver
def main():
    file_name = sys.argv[1]
    district = sys.argv[2]
    year = sys.argv[3]
    cleaning_files.cleaner(file_name, district, year)
    # query_list.queryDriver(district)


if __name__ == '__main__':
  main()
