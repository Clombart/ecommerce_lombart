import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyD922a9ofND4jasUTarUWO8bN6In9tB60s",
  authDomain: "ecommerce-chocolates.firebaseapp.com",
  projectId: "ecommerce-chocolates",
  storageBucket: "ecommerce-chocolates.appspot.com",
  messagingSenderId: "269032981319",
  appId: "1:269032981319:web:70a29bbe090724efe78262"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//funcion para exportar el app
export default function iniFirestore() {
  return app
}