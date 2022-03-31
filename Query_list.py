# list of cypher queries to Neo4j
from neo4j import GraphDatabase
import District_queries

x = input("User id: ")
y = input("Password: ")
db = GraphDatabase.driver(uri="bolt://localhost:11003", auth=(x, y))
session = db.session()

districts = ["Alaska Gateway School District",
             "Aleutian Region School District",
             "Aleutians East Borough School District",
             "Anchorage School District",
             "Annette Island School District",
             "Bering Strait School District",
             "Bristol Bay Borough School District",
             "Chatham School District",
             "Chugach School District",
             "Copper River School District",
             "Cordova City School District",
             "Craig City School District",
             "Delta / Greely School District",
             "Denali Borough School District",
             "Dillingham City school District",
             "Fairbanks North Star Borough School District",
             "Galena City School District",
             "Haines Borough School District",
             "Hoonah City School District",
             "Hydaburg City School District",
             "Iditarod Area School District",
             "Juneau Borough School District",
             "Kake City School District",
             "Kashunamiut School District",
             "Kenai Peninsula Borough School District",
             "Ketchikan Gateway Borough School District",
             "Klawock City School District",
             "Kodiak Island Borough School District",
             "Kuspuk School District",
             "Lake and Peninsula School District",
             "Lower Kuskokwim School District",
             "Lower Yukon School District",
             "Matanuska - Susitna Borough School District",
             "Mount Edgecumbe",
             "Nenana City School District",
             "Nome Public Schools",
             "North Slope Borough School District",
             "Northwest Arctic Borough School District",
             "Pelican City School District",
             "Petersburg Borough School District",
             "Pribilof School District",
             "Saint Mary's School District",
             "Sitka School District",
             "Skagway School District",
             "Southeast Island School District",
             "Southwest Region School District",
             "Tanana City School District",
             "Unalaska City School District",
             "Valdez City School District",
             "Wrangell Public School District",
             "Yakutat School District",
             "Yukon Flats School District",
             "Yukon - Koyukuk School District",
             "Yupiit School District"]


# deleting all nodes and all relationships, if ever needed.
def deleteAll():
    result = '''
    MATCH (n) DETACH DELETE n;
    MATCH (n)
    RETURN count(n) as count
    '''

# import csv data
# selects query based on specific district name
def importer(district):
    # checking if the district exists
    for d in range(len(districts)):
        if district == districts[d]:
            result = District_queries.districtList(district)
            return result
        elif district != districts[d] and d == len(districts):
            print("Not a valid district.")
            break
        d += 1


# formatting all transaction nodes
# district nodes
def dNodes():
    result = '''
             MATCH (d:District),(t:FullTransaction) 
             WHERE EXISTS (d.District_Name) AND EXISTS (t.District_Name) AND d.District_Name=t.District_Name 
             MERGE (t)-[:BELONGS_TO]->(d);
             '''
    return result


def ocNodes():
    result = '''
             MATCH (o:Object),(t:FullTransaction)
             WHERE EXISTS (o.Object_Code) AND EXISTS (t.Object_Code) AND o.Object_Code=t.Object_Code
             MERGE (t)-[:TYPE_OF]->(o);
             '''
    return result


def fyNodes():
    result = '''
             MATCH (f:Fiscal_Year),(t:FullTransaction)
             WHERE EXISTS (f.Fiscal_Year) AND EXISTS (t.Fiscal_Year) AND f.Fiscal_Year=t.Fiscal_Year
             MERGE (t)-[:OCCURED_IN]->(f);
             '''
    return result


def queryDriver(D):
    session.run(query=(importer(D))).data()
    session.run(query=(dNodes())).data()
    session.run(query=(ocNodes())).data()
    session.run(query=(fyNodes())).data()
