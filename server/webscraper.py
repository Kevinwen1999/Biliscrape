from selenium import webdriver
from bs4 import BeautifulSoup
import requests
import json
import sys

search_keyword = sys.stdin.readline()
data = []
#Session = requests.Session()
for i in range (1, 6):
    url = "http://search.bilibili.com/all?keyword=" + search_keyword + "&order=totalrank&duration=0&tids_1=0&page=" + str(i)
    '''
    uurl = "https://www.bilibili.com"
    requests.get(url)
    html = requests.get(url)
    requests.get(url)
                        #+ ("" if i == 1 else "&page=" + str(i)))
    if html.status_code != 200:
        print("fucked")
    html.encoding = 'utf-8'
    print(html.text)
    '''

    option = webdriver.ChromeOptions()
    option.add_argument("-incognito")
    option.add_argument("-headless")
    browser = webdriver.Chrome(executable_path='./chromedriver', chrome_options=option)
    browser.get(url)
    html = browser.page_source

    # html.encoding = 'utf-8'
    soup = BeautifulSoup(html, 'html.parser')
    video_list = soup.find_all('li', class_='video matrix')
    for video in video_list:
        a = video.find('a')
        data.append(json.dumps({"Name": a['title'], "Link":a['href']}))
        #print(a['title'], end=" ")
        #print(a['href'])

#print("done")

print(json.dumps(data))
sys.stdout.flush()
