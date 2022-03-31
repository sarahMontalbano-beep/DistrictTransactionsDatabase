# DistrictTransactionsDatabase
This is the data cleaning / import portion of the District Transactions Database.

Steps:
1. The user first enters the username and password for the Neo4j database.
2. Then, the user enters in the file name and the program searches for it.
3. Once the file is located, the user enters in the school district and fiscal year.
4. The file is then imported into a dataframe and cleaned.
5. Once cleaned, the program uploads the file to the database via pre-written cypher queries.
