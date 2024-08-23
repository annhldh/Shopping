// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCz_MO8fDf6eNWKGrnAgPdF73WbVGbziCY",
  authDomain: "shopping-f080f.firebaseapp.com",
  projectId: "shopping-f080f",
  storageBucket: "shopping-f080f.appspot.com",
  messagingSenderId: "555042582710",
  appId: "1:555042582710:web:d432a0c08fd764f373b617",
  measurementId: "G-CL3Q52ZTXR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
// Khởi tạo Firestore
const db = getFirestore(app);

import { addDoc, collection } from 'firebase/firestore';

// Hàm để thêm sản phẩm vào Firestore
async function addProduct(product) {
  try {
    const docRef = await addDoc(collection(db, "products"), product);
    console.log("Sản phẩm đã được thêm với ID: ", docRef.id);
  } catch (e) {
    console.error("Lỗi khi thêm sản phẩm: ", e);
  }
}

// Ví dụ thêm sản phẩm
const newProduct = {
  name: "Sản phẩm A",
  price: 100000,
  manufacturer: "Nhà sản xuất A",
  imageUrl: "https://example.com/image.jpg",
  quantitySold: 500
};

addProduct(newProduct);

import { getDocs, collection } from 'firebase/firestore';

// Hàm để lấy và hiển thị sản phẩm
async function displayProducts() {
  const querySnapshot = await getDocs(collection(db, "products"));
  const productTable = document.querySelector('.product-table');

  querySnapshot.forEach((doc) => {
    const product = doc.data();
    const productCell = document.createElement('div');
    productCell.className = 'product-cell';

    productCell.innerHTML = `
      <img src="${product.imageUrl}" alt="${product.name}">
      <p>${product.name}</p>
    `;

    productTable.appendChild(productCell);
  });
}
document.getElementById('product-form').addEventListener('submit', async (e) => {
    e.preventDefault();
  
    // Lấy dữ liệu từ form
    const name = document.getElementById('name').value;
    const price = document.getElementById('price').value;
    const manufacturer = document.getElementById('manufacturer').value;
    const imageUrl = document.getElementById('imageUrl').value;
    const quantitySold = document.getElementById('quantitySold').value;
  
    // Tạo đối tượng sản phẩm
    const newProduct = {
      name,
      price: parseInt(price),
      manufacturer,
      imageUrl,
      quantitySold: parseInt(quantitySold)
    };
  
    // Thêm sản phẩm vào Firestore
    await addProduct(newProduct);
  
    // Xóa dữ liệu form sau khi thêm
    document.getElementById('product-form').reset();
  });
  

displayProducts();
