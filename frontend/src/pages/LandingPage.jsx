import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';


function LandingPage() {
  useEffect(() => {
    AOS.init();
  }, []);

  const images = [
    { src: "https://scontent.fmnl33-5.fna.fbcdn.net/v/t1.15752-9/450549741_979168853944773_5459323224692122287_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=9f807c&_nc_eui2=AeFLB0ulFwuKOUIUoUZzKJUlOlMHEMj1MlI6UwcQyPUyUsR8pRZvvPLmWHGwr0rfvcDpLCr0oLJ5n6GOLCNzn13V&_nc_ohc=urUs13UM1jYQ7kNvgHh_RkI&_nc_ht=scontent.fmnl33-5.fna&gid=AmJvKzf1AtmIkRpbtY6tbAw&oh=03_Q7cD1QG4czUA0zDDrLb4DitFDd7BtNNsRQsPjsCJIqYvGnoGkQ&oe=66D16255", name: "Agcaoili, Eilizon" },
    { src: "https://scontent.fmnl33-5.fna.fbcdn.net/v/t1.15752-9/452209309_1019379773309417_5603975941456259643_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=9f807c&_nc_eui2=AeHIUrq5QGOmeVDWwr9E_YJFBX-PLNriPboFf48s2uI9uq8Jt1PFY_L7-gLX8uxnf63Mh_s819pVun52h2eYaOmy&_nc_ohc=Yr7K7dxwfFMQ7kNvgE7cJ8S&_nc_ht=scontent.fmnl33-5.fna&oh=03_Q7cD1QFo6x5ChvYf2fCGTLkYAW4QN4s5QFdrRg4QcQcV3xVyaQ&oe=66D17951", name: "Aquino, Alexandra" },
    { src: "https://scontent.fmnl33-6.fna.fbcdn.net/v/t1.15752-9/452327238_1185347492511854_424494830412459948_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=9f807c&_nc_eui2=AeGpkhrOJIEaeG9nvJ7GUH_iQlWQp9ARioBCVZCn0BGKgJRD77HREhLMfExPnx7-KlTouABUj5NsCevmt55Axgz6&_nc_ohc=xf_d5fO6rIIQ7kNvgFLGE2B&_nc_ht=scontent.fmnl33-6.fna&gid=AmJvKzf1AtmIkRpbtY6tbAw&oh=03_Q7cD1QGZmUe0UqLLOkNhG3QL9Mgpvu26zwrtB41cCXcxnNYGmw&oe=66D1682D", name: "Barela, Remdel" },
    { src: "https://scontent.fmnl33-5.fna.fbcdn.net/v/t1.15752-9/452656226_1172563510554050_661124181072352074_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=9f807c&_nc_eui2=AeEqtFCgMnPMiE6uZ3Fk0dNh9UtZKvR-ywr1S1kq9H7LCk3StTql9mJPzlVRNRi12ckA3Lg-YZj2dvnDzsxppZGl&_nc_ohc=3rMLEjccDMUQ7kNvgF4EcjF&_nc_ht=scontent.fmnl33-5.fna&gid=AygtwN11cnVSMNPptQtAqIQ&oh=03_Q7cD1QGDssdNq4473xaPnFAiqfrDjqs8IxDx6w0M1u-1G0rxTw&oe=66D178E5", name: "Dorilag, Jayson" },
    { src: "https://scontent.fmnl33-3.fna.fbcdn.net/v/t1.15752-9/451852023_1178061346650826_3954632992932468998_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=9f807c&_nc_eui2=AeGTXvWGfCEobCfViwBRun7Ujesy8hVYTcGN6zLyFVhNwWG_qZVkli8k9vHtBLBT9gnJBK5lorrz7NW9xy548LzC&_nc_ohc=HanUiIe1zcEQ7kNvgG8Unye&_nc_ht=scontent.fmnl33-3.fna&oh=03_Q7cD1QGVmP3ISJMD52_wOlTQucJITWwE_t4QdeOQtab1Th4ZPw&oe=66D151D7", name: "Falogme, Ej Cezar" },
    { src: "https://scontent.fmnl33-5.fna.fbcdn.net/v/t1.15752-9/449297365_504156675322529_8511347400465409399_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=9f807c&_nc_eui2=AeG2BnYYPakQaXyZs4peAgGnWvEUFd4UQnta8RQV3hRCewQQRiW6p6jW7dLqJCVj3SFOr0wbEZH1QOjYG0oZ90I9&_nc_ohc=q2ycdDVPU74Q7kNvgF8FtP0&_nc_ht=scontent.fmnl33-5.fna&gid=AmJvKzf1AtmIkRpbtY6tbAw&oh=03_Q7cD1QH1uQ6Qy9v4jzrwQh8uLvtbhwLosM0w6FCdaWwSDTHYcg&oe=66D17337", name: "Mirandilla, Reden" },
    { src: "https://scontent.fmnl33-3.fna.fbcdn.net/v/t1.15752-9/452673401_1043577660695624_1379312138428667425_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=9f807c&_nc_eui2=AeGhJxY3iVCgCda10SohKCd2ycYaT7vWTBTJxhpPu9ZMFGW5mUpXTgikedbVXEtNjXgChfIX8AHwIpVwILSQzeMZ&_nc_ohc=NtYdmS1k8_YQ7kNvgGpHtkE&_nc_ht=scontent.fmnl33-3.fna&oh=03_Q7cD1QH-jVxCjVMTEUGIVcv3oZ21orDGMErUwb9v3m9vR0O5-Q&oe=66D178C8", name: "Gregori, Jiselle" }
  ];

  

  return (
    <div>
    <div className='pt-5'>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div>
          <Link to="/watersensor">
            <div className="h-48 w-full rounded-xl bg-yellow-400 p-4 flex flex-col items-center justify-center" data-aos="zoom-in-down">
              <h2 className="text-3xl font-extrabold text-white">Water Level</h2>
            </div>
          </Link>
        </div>
        <div>
          <Link to="/loadcellweight">
            <div className="h-48 w-full rounded-xl bg-yellow-400 p-4 flex flex-col items-center justify-center" data-aos="zoom-in-down">
              <h2 className="text-3xl font-extrabold text-white">Cat's Weight</h2>
            </div>
          </Link>
        </div>
        <div>
          <Link to="/loadcellfood">
            <div className="h-48 w-full rounded-xl bg-yellow-400 p-4 flex flex-col items-center justify-center" data-aos="zoom-in-down">
              <h2 className="text-3xl font-extrabold text-white">Food Weight</h2>
            </div>
          </Link>
        </div>
        <div>
          <Link to="/rfidscanner">
            <div className="h-48 w-full rounded-xl bg-yellow-400 p-4 flex flex-col items-center justify-center" data-aos="zoom-in-down">
              <h2 className="text-3xl font-extrabold text-white">Cat Profile</h2>
            </div>
          </Link>
        </div>
        <div>
          <Link to="/phsensor">
            <div className="h-48 w-full rounded-xl bg-yellow-400 p-4 flex flex-col items-center justify-center" data-aos="zoom-in-down">
              <h2 className="text-3xl font-extrabold text-white">Water pH Level</h2>
            </div>
          </Link>
        </div>
        <div>
          <Link to="/ultrasonic">
            <div className="h-48 w-full rounded-xl bg-yellow-400 p-4 flex flex-col items-center justify-center" data-aos="zoom-in-down">
              <h2 className="text-3xl font-extrabold text-white">Storage</h2>
            </div>
          </Link>
        </div>
      </div>
    </div>
    <div className='pt-5 '>
    <h2 className="text-3xl font-extrabold text-yellow-500">Group 2</h2>
    </div>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 justify-center pt-5">
      {images.map((image, index) => (
        <div key={index} className="text-center">
          <img className="h-100 w-100 rounded-lg" src={image.src} alt={`Gallery image ${index + 1}`} />
          <p className='pt-2 font-extrabold'>{image.name}</p>
        </div>
      ))}
    </div>
    </div>
  );
}

export default LandingPage;
