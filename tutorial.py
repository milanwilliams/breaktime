#import library
import gspread
#Service client credential from oauth2client
from oauth2client.service_account import ServiceAccountCredentials
# Print nicely
import pprint

from sheetsApp import *

#Create scope
scope = ["https://spreadsheets.google.com/feeds",'https://www.googleapis.com/auth/spreadsheets',
"https://www.googleapis.com/auth/drive"]
#create some credential using that scope and content of config.json
creds = ServiceAccountCredentials.from_json_keyfile_name('config.json',scope)
#create gspread authorize using that credential
client = gspread.authorize(creds)
#Now will can access our google sheets we call client.open on HarryPotter
sheet = client.open_by_key("1FvKMWflADJHt8sS5rs71FZOr-Xq0mUlJEdKxsg_RiKk").sheet1
#sheet = client.open('HarryPotter').sheet1
pp = pprint.PrettyPrinter()
#Access all of the record inside that
result = sheet.get_all_records()

pp.pprint(result)


