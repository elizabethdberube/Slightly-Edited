import { openDB } from 'idb';

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

  const textDb = await openDB('text', 1);

  const text = textDb.transaction('text', 'readwrite');

  const save = text.objectStore('text');

  const request = save.put({ text: content });

  const result = await request;

  console.log('Data saved to the database', result);
}

// method that gets all the content from the database
export const getDb = async () => {
  console.log('GET all from db');

  const textDb = await openDB('text', 1);

  const text = textDb.transaction('text', 'readwrite');

  const save = text.objectStore('text');

  const request = save.getAll();

  const result = await request;
  console.log('result.value', result);
  return result;
}

initdb();
