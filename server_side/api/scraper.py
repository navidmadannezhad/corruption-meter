import requests
from bs4 import BeautifulSoup

URL = "https://en.wikipedia.org/wiki/Corruption_Perceptions_Index"
years = [2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013, 2012]

def get_corruption_data():
    page = requests.get(URL)
    soup = BeautifulSoup(page.content, "html.parser")
    table = soup.find_all("table")[4].find("tbody")
    table_rows = table.find_all("tr")

    required_data = []
    test_row = table_rows[5]

    for row in table_rows[2:]:
        tds = row.find_all("td")
        values = []
        i = 0
        for td in tds[2: :2]:
            value = [td_num(td), years[i]]
            values.append(value)
            i = i+1
        
        item = {
            "country_name": row.find_all("td")[1].find("a").text,
            "rank": row.find_all("td")[0].text,
            "values":values
        }
        required_data.append(item)

    return required_data


def td_num(td):
    if len(filter_list(td.contents)) == 0:
        return False
    return td.contents[0].contents[1].text

def filter_list(element_list):
    for item in element_list:
        if str(item).isspace():
            element_list.remove(item)
    return element_list


get_corruption_data()