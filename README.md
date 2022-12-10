# Blog With Remix and Notion

I wrote a [blog article](https://www.blackcathacks.com/post/b5e5b146-03c0-4380-8ed4-f01499087356) on how this blog was made in detail and contains more detailed Notion setup instructions. If you don't care and you just want to get everything setup as quickly as possible. 

# IMPORTANT IF YOU'RE READING THE BLOG
If you want the completed code from the blog post, you can switch to the `blog-post-completed` branch. This project's main branch will contain additional features built on top of the content from the blog. I didn't want the blog post to get overly complex.

## install packages

In this project I used [pnpm](https://pnpm.io/installation) as my package manager, of course you
can use any package manger.
pnpm:

```sh
pnpm install
```

or npm:

```sh
npm install
```

## Setting Up and Configuring Notion

Step 1:
If you have not created a Notion workspace you will need at least one that you have created.
Go to [your integrations](https://www.notion.so/my-integrations) on notion. Create a new integration. Give it a name, and for the purposes of this blog you will just need "read content" under content capabilities. Once the integration is created you're going to want to save/copy the "internal integration token" to be used in a later step.

Step 2:
Create a new Notion page.

Step 3:
Within that page create a list view with a new database.

Step 4:
Add the following properties to the database
- “Post Image” as the Files and Media  
- “Public” as the checkbox type
- “Sub Title” as text type
- “last edited time” type - you do not need to specify a name for this, this is a default property that already has a name assigned.

Step 5:
In your database list view, click the 3 dots in the very top right corner of Notion and click "+ Add Connections" and select the name of the integration you named in step 1.

Step 6:
Again make sure you're in the database list view, click on "share" in the upper right hand corner and then click "copy link", paste that link somewhere and it should look something like:
https://www.notion.so/5a39cf71903a4fddf030q09834caedaf7f6?v=9361234d1baec49828b20daf092322
Pay close attention - to get the database ID you want to copy everything after notion.so/ and before the ?v=
So in this example your database ID would be 5a39not71903a4your030q09834database7f6

Step 7:
Change .env.example to .env
Then update NOTION_DATABASE with the notion database key you obtained from the previous step.
Then Set NOTION_API_KEY to the "internal integration token" you copied in step 1.

## Launch The App!

```sh
pnpm run dev
```

Open up [http://localhost:3000](http://localhost:3000) and you should be ready to go!

## Simple deployment with Vercel

[import your Git repository](https://vercel.com/new) into Vercel, and it will be deployed.

Of course you can use the Vercel CLI. Remix has documentation on this so if you wanted to do that you can follow that guide.

- [Remix Docs](https://remix.run/docs)
