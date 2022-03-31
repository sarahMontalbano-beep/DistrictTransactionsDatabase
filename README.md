# DistrictTransactionsDatabase
This is the data cleaning / import portion of the District Transactions Database.
Steps:
The user first enters the username and password for the Neo4j database
Then, the user enters in the file name and the program searches for it
Once the file is located, the user enters in the school district and fiscal year
The file is then imported into a dataframe and cleaned
Once cleaned, the program uploads the file to the database via pre-written cypher queries.
