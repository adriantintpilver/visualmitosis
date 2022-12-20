# Visual-CancerDB

Visual Mitosis is a website that displays data from the https://cancerdb.com public database that contains data on all cancer treatments and related entities.

Someone's new treatment could be just 2 ideas away from being the next big cure. CancerDB can help you discover what those 2 missing pieces of knowledge are.

For cancer patients and their loved ones, we want to bring you the absolute best facts about cancer. We will deliver that information to you quickly, free of charge and you can trust it 100%.

The site does not yet have a domain and cannot be navigated. In this initial stage.

<b>To upload a case</b>

To register a new case, touch the upload button at the top right of the site. For now, this is without security and anyone can do it in this initial version.

<b>To delete a case</b>

There is no interface on the web to do it from the site but you can place delete by placing "/delete/ok" in the URL where we are seeing the case.
url "/image/6352d3a3cfa0c5cbf376d92c"
add
url "/image/6352d3a3cfa0c5cbf376d92c/delete/ok" to remove it.

<b>To edit a case</b>

There is no interface on the web to do it from the site but you can place edit by placing "/edit/:imageid" in the URL where we are seeing the case.
url "/image/6352d3a3cfa0c5cbf376d92c"
add
url "/edit/6352d3a3cfa0c5cbf376d92c" to edit it.

<b>To build the full site locally</b>

Te site is set up these are the instructions:

1- Go to the command line in the folder where you have the downloaded project. For example c:/visualmitosis
2- install packages with npm
```bash
npm i express ejs fs-extra sqlite3 morgan multer timeago.js uuidv4 fs-extra
```
3- run this in the local folder with the project for dev 
```bash
 npm run dev
```
4- or for production run
```bash
npm run prd
```
5- navigate to http://localhost:3000
