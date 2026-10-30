# Restore Pronia MongoDB

Application source files do not need changes. This folder contains database import material only.

## What to use

- **Recommended:** run `restore.mongodb.js` once in MongoDB Compass's embedded shell. It creates `Pronia.products` and `Pronia.users`, inserts the 11 replacement products, and creates an email lookup index.
- **Alternative:** import `products.json` through Compass and create an empty `users` collection manually.
- `users.json` intentionally contains an empty array. No pre-existing users or passwords can be recovered from the repository. You do not need to import this empty file.

Choose one method. The shell script is safe to rerun: it inserts missing seed IDs and leaves existing records untouched. It never drops collections or deletes users.

## 1. Prepare MongoDB Atlas

1. Sign in to MongoDB Atlas and open your project.
2. Open an existing active cluster or create a cluster if the old one was deleted. If it is paused, resume it.
3. Open **Database Access**, or **Database & Network Access**, and create a database user if needed. Give it **readWrite** access to the **Pronia** database.
4. Save that database username and password. These credentials connect your backend to MongoDB; they are different from customers' website accounts.
5. Under **Network Access / IP Access List**, add your computer's current public IP for Compass.
6. Also allow the deployed backend's outbound IP addresses. A working Compass connection alone does not establish access for Render.
7. On the cluster, choose **Connect → Compass**, then copy the connection string. Replace username/password placeholders with the database credentials. If a password contains URI special characters, percent-encode them.

Atlas documentation:
- https://www.mongodb.com/docs/atlas/security-add-mongodb-users/
- https://www.mongodb.com/docs/atlas/connect-to-database-deployment/

## 2. Connect using MongoDB Compass

1. Open MongoDB Compass.
2. Create a new connection and paste the Atlas connection string.
3. Click **Connect**.
4. If connection fails, check that the cluster is active, the database credentials are correct, and the connecting machine's IP is allowed. A server-selection timeout does not prove an IP issue by itself.

## 3A. Recommended: run the complete database script

1. In the connected Compass window, open the embedded **MongoDB Shell / mongosh** panel. Its location varies by Compass version.
2. Open `restore.mongodb.js` in a text editor.
3. Copy the entire file, paste it into the MongoDB shell, and run it.
4. The script explicitly selects **Pronia**, regardless of the shell's currently selected database.
5. For a fresh database, the output should report **New products inserted: 11**, **Total products: 11**, and **Total users: 0**.
6. Refresh the database list. Expand **Pronia**. You should see **products** and **users**.
7. Open **products → Documents**. The `_id` fields should appear as real **ObjectId** values, like the screenshot.

If you already have extra products or users, totals can be higher. Re-running the script normally reports zero new products once its IDs exist.

You can also run the file from standalone mongosh after connecting:

```javascript
load("D:/My projects/pronia/mongodb-restore/restore.mongodb.js")
```

## 3B. Alternative: import through Compass buttons

Skip this section if you ran the script.

1. Create a database named **Pronia**, with the initial collection named **products**. Capitalization matters: the backend explicitly connects to `Pronia`.
2. Select **Pronia → products**.
3. Click **Add Data → Import JSON or CSV file**.
4. Select `products.json` in this folder.
5. Choose **JSON**, then **Import**.
6. The file is a JSON array in MongoDB Extended JSON format. Compass converts `{"$oid":"..."}` into ObjectId and `{"$date":"..."}` into Date. Use JSON import rather than CSV so these types and nested data are preserved.
7. Verify there are 11 records and `_id` displays as ObjectId.
8. Under **Pronia**, create another collection named **users**, entirely lowercase.
9. Leave **users** empty. Website registration will insert its first document.
10. Do not repeatedly import the same JSON file; its fixed IDs will cause duplicate-key errors. Use the recommended script for repeatable imports.

Official Compass import instructions:
https://www.mongodb.com/docs/compass/import-export/

## 4. Point the existing backend at this database

If the original cluster and credentials are still valid, the existing connection setting can remain as-is. If you created a new cluster or database user, update configuration:

- Local backend: set `CONNECTION_STRING` in `backend/.env`.
- Render: set `CONNECTION_STRING` in the backend service's Environment settings, then restart/redeploy the service.

Example only, with placeholders:

```dotenv
CONNECTION_STRING=mongodb+srv://DATABASE_USER:ENCODED_DATABASE_PASSWORD@YOUR_CLUSTER.mongodb.net/?retryWrites=true&w=majority
JWT_SECRET_KEY=YOUR_LONG_RANDOM_SIGNING_SECRET
BCRYPT_PEPPER=YOUR_PRIVATE_PEPPER
MAIL_SENDER_EMAIL=YOUR_GMAIL_ADDRESS
MAIL_SENDER_PASS=YOUR_GMAIL_APP_PASSWORD
```

Do not paste these placeholder values into a working environment. Keep existing secret values if already configured. The backend sets `dbName: "Pronia"` in its connection code.

`JWT_SECRET_KEY` signs login cookies. `BCRYPT_PEPPER` must stay consistent across registration, login, and password changes: your controller hashes `password + BCRYPT_PEPPER` with bcrypt, cost 11. Changing the pepper after users register prevents their existing passwords from matching.

Mail settings are only needed for password-reset email, not normal registration/login. The current reset-email URL is hard-coded to https://pronia.onrender.com; database imports cannot change that.

Start the existing backend from PowerShell:

```powershell
cd "D:\My projects\pronia\backend"
npm start
```

The backend serves its existing built frontend from `backend/dist`, on port 3000 unless PORT is set. Open http://localhost:3000 for a local check. Running Vite separately currently has no API proxy configured.

## 5. Create a real account and verify all saved data

1. Open the website and visit **Register**.
2. Enter your name, email and a password, then submit.
3. Refresh **Pronia → users** in Compass. One user should now exist.
4. The stored password should be a bcrypt hash, not the password you typed.
5. Log out, then log in using the same email spelling and password.
6. Add a product to your cart. Refresh that user document: `cart` should contain a real product ObjectId and a quantity.
7. Add a product to the wishlist and verify the `wishlist` array.
8. Save an address from the profile page and verify `addresses`.
9. Place a test order. The existing controller saves an order summary into `orders` and empties `cart`. It does not implement payment processing.
10. Restart the backend or refresh the site and log in again to verify persistence.

The original app caches the product list for 60 seconds. After imports, restart the backend or wait for that cache to expire if the catalog still looks empty.

## Actual storage layout from the code

Only two collections are referenced by the backend models:

| Collection | Data stored |
| --- | --- |
| Pronia.products | name.eng, name.geo, price (string), rating (number), image and hoverImage (number strings), description (string), categorie (array), color |
| Pronia.users | firstName, lastName, email, password hash, cart, wishlist, orders, addresses |

Carts, wishlists, orders and addresses are embedded in each user. They do not need separate collections. Reviews, homepage banners, contact content and other static page content come from frontend files rather than additional MongoDB models.

A saved user has this shape (illustration only; do not import placeholders):

```javascript
{
  _id: ObjectId("..."),
  firstName: "Your first name",
  lastName: "Your last name",
  email: "your-email@example.com",
  password: "<bcrypt hash produced by website registration>",
  cart: [{ productId: ObjectId("680b51ed1adc28b5d4379135"), quantity: 1 }],
  wishlist: [ObjectId("680ca36d1adc28b5d4379136")],
  orders: [{
    id: "generated by checkout",
    date: "generated by checkout",
    status: "Processing",
    total: "$29.44 for 1 items"
  }],
  addresses: [{
    country: "Georgia",
    firstName: "Your first name",
    lastName: "Your last name",
    company: "",
    address: "Your street",
    city: "Tbilisi",
    state: "Tbilisi",
    postcode: "0100",
    email: "your-email@example.com",
    phone: "555123456"
  }]
}
```

Mongoose also adds subdocument IDs and version fields where applicable. Registration creates empty arrays automatically. Never insert a plaintext password or invent a password hash manually; register through the existing website so the hash matches your configured pepper.

## Catalog reconstruction notes

The 11 English product names and their image-number mappings were recovered from earlier image filenames in Git history. Those names do not always botanically match the actual photos; the import preserves the original catalog naming.

| Image | Original catalog name |
| --- | --- |
| product1.jpg | American Marigold |
| product2.jpg | Black-Eyed Susan |
| product3.jpg | Bleeding Heart |
| product4.jpg | Bloody Cranesbill |
| product5.jpg | Butterfly Weed |
| product6.jpg | Common Yarrow |
| product7.jpg | Doublefile Viburnum |
| product8.jpg | Feather Grass |
| product9.jpg | Hybrid Pansy |
| product10.jpg | Million Gold |
| product11.jpg | Moss Verbena |

The screenshot's first product ID, price 23.45, rating 5 and Gold color are retained. Other IDs, Georgian names, prices, ratings, descriptions, dates and category assignments are replacement data, not recovered records. Each product uses its own image for hover because no separate second view of that product is available.

Image references are stored as strings such as `"1"`, because the existing frontend constructs `/productImg/product1.jpg`. Images remain in the website files; MongoDB stores their references.

The import uses the CURRENT schema (`name.eng/geo`, `categorie`, string description), which differs from the old screenshot (`title.en/ka`, `category`, object description).

The frontend's category key `bansai` is preserved exactly. No garden-tool product was invented because there are no corresponding product images; that filter can legitimately return no results. `createdAt` is included as a real BSON Date for the frontend's newest sort even though the current Mongoose product schema does not declare timestamps; the import inserts it directly.

Old customer accounts, password hashes, orders and addresses cannot be recovered from these source files. They require an actual database backup; new registrations work with the recreated users collection.

## If something still fails

- **Products missing:** confirm the exact database name `Pronia` and collection `products`; open `/api/products` on the backend and check that it returns an array.
- **Register fails:** inspect the backend logs and confirm MongoDB connectivity, write permissions and JWT configuration. An empty users collection is expected before registration.
- **Login fails:** register a new account first; keep the same pepper and email spelling.
- **Cart/wishlist fails:** log in and ensure product references are BSON ObjectIds, not strings.
- **Atlas connection timeout:** check cluster status, DNS/network access, IP allowlist, credentials and backend logs. The earlier restore attempt failed to connect, so no live database restoration has been verified.
