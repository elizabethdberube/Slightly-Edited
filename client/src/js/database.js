import { openDB } from 'idb';

// Start the database.
const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.log('PUT to the database');

  const jateDb = await openDB('jate', 1);

  const tx = jateDb.transaction('jate', 'readwrite');

  const save = tx.objectStore('jate');

  const request = save.put({ content_name: content });

  const result = await request;

  console.log('Data saved to the database', result);
}

// method that gets all the content from the database
export const getDb = async () => {
  console.log('GET all from db');

  const jateDb = await openDB('jate', 1);

  const tx = jateDb.transaction('jate', 'readonly');

  const save = tx.objectStore('jate');

  const request = save.getAll();

  const result = await request;
  console.log('result.value', result);
  return result;
}

initdb();
