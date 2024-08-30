
import Header from "../../components/header/header"


import { Nunito_Sans } from "next/font/google";
import "./globals.css";

import styles from "../../styles/global/container_global.module.css"



const nunito_sans = Nunito_Sans({ subsets: ["latin"] });

export const metadata = {
  title: "Jober",
  description: "Projeto CRUD JOBER",
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={nunito_sans.className}>
        <Header/>
        <div className={styles.container_content}>
        {children}
        </div>
        
        </body>
    </html>
  );
}
