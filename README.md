## NOTE:
Program menggunakan server lokal api yang di gunakan sebagai dummy api sebelum di kembangkan menggunakan api luar.

## instalation
- clone repository kemudian masuk ke direktory yang program
- jalankan `npm install`

## runing aplication
- terdapat 2 mode yaitu dev dan production
- mode development diperuntukan untuk pengembangan, karena di sini menggunakan dummy server local. maka perlu dengan menjalankan perintah di bawah ini pana commandline kalian:
    1. `npm run start-dev` nanti akan menjalankan di port `8080` tapi di sini server api dummy belum menyala, jadi perlu menjalankan server api dengan cara buka terminal baru kemudian jalankan `npm run start-server`
    2. atau bisa juga dengan menjalankan `npm run start-dev-test` nantinya perintah tersebut akan menjalankan perintah pada point 1 secara paralel.
- mode production diperuntukan untuk di deploy di server. dengan menjalankan perintah:
    1. `npm run build` maka program akan terdeploy di folder `dist/` folder tersebut sudah bisa di pasang di server. disini server api harus menyala, jadi perlu menjalankanya dengan menggunakan perintah `npm run start-server`
- terdapat config yang digunakan untuk merubah url server yaitu pada file `./src/script/config.js` url tersebut di sesuaikan dengan url api yang digunakan.

seluruh script yang dapat digunakan dan plugin yang di gunakan dapat di lihat pada file `package.json`