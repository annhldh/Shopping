import { initializeApp } from "node_modules/firebase/app";
import { getFirestore, collection, addDoc, getDocs } from "node_modules/firebase/firestore";
import { getAnalytics } from "node_modules/firebase/analytics";

// Your web app's Firebase configuration
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
const db = getFirestore(app);

// Hàm để thêm sản phẩm vào Firestore
async function addProduct(product) {
  try {
    const docRef = await addDoc(collection(db, "products"), product);
    console.log("Sản phẩm đã được thêm với ID: ", docRef.id);
  } catch (e) {
    console.error("Lỗi khi thêm sản phẩm: ", e);
  }
}

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

// Xử lý sự kiện khi form được submit
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

  // Cập nhật danh sách sản phẩm
  document.querySelector('.product-table').innerHTML = '';
  displayProducts();
});

// Hiển thị sản phẩm khi trang tải
displayProducts();
