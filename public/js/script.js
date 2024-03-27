document.addEventListener("DOMContentLoaded", function () {
  const btnRemove = document.getElementById("btn_remove");
  
  btnRemove.addEventListener("click", () => {
    // Send a request to the Node.js route
    
    

    fetch("/removeDups")
      .then((response) => {
        // Handle the response
       
        
        if (response.ok) {
          // Request was successful
          console.log("Route /remove was called successfully.");
          window.location.href = "/";
        } else {
          // Request failed
          console.error("Failed to call route /remove.");
        }
      })
      .catch((error) => {
        // Handle any errors
        console.error("An error occurred while calling route /remove:", error);
      });
  });

 

    //download file csv

  const btnDownloadcsv = document.getElementById("btn_downloadcsv");

  // Add a click event listener to the button
  btnDownloadcsv.addEventListener("click", () => {
    // Send a request to the Node.js route
    fetch("/downloadcsv")
      .then((response) => {
        // Handle the response
        if (response.ok) {
          // Download the file
          response.blob().then((blob) => {
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "result.csv";
            a.click();
          //  window.location.href = "/";
          });
        } else {
          // Request failed
          console.error("Failed to download the file.");
        }
      })
      .catch((error) => {
        // Handle any errors
        console.error("An error occurred while downloading the file:", error);
      });
  });




});







document.addEventListener("DOMContentLoaded", function () {
  const btnRemove2 = document.getElementById("btn_remove2");

  btnRemove2.addEventListener("click", () => {
    // Send a request to the Node.js route
    fetch("/removeDups")
      .then((response) => {
        // Handle the response
        if (response.ok) {
          // Request was successful
          console.log("Route /remove was called successfully.");
         window.location.href = "/";
        } else {
          // Request failed
          console.error("Failed to call route /remove.");
        }
      })
      .catch((error) => {
        // Handle any errors
        console.error("An error occurred while calling route /remove:", error);
      });
  });

     
    //download file csv

   const btnDownloadXcsv = document.getElementById("btn_downloadXcsv");

   // Add a click event listener to the button
   btnDownloadXcsv.addEventListener("click", () => {
     // Send a request to the Node.js route
     fetch("/downloadXcsv")
       .then((response) => {
         // Handle the response
         if (response.ok) {
           // Download the file
           response.blob().then((blob) => {
             const url = window.URL.createObjectURL(blob);
             const a = document.createElement("a");
             a.href = url;
             a.download = "result2.csv";
             a.click();
            //window.location.href = "/";
          
           });
         } else {
           // Request failed
           console.error("Failed to download the file.");
           
         }
       })
       .catch((error) => {
         // Handle any errors
         console.error("An error occurred while downloading the file:", error);
       });
   });

   //download file

  const btnDownload = document.getElementById("btn_download");

  // Add a click event listener to the button
  btnDownload.addEventListener("click", () => {
    // Send a request to the Node.js route
    fetch("/download")
      .then((response) => {
        // Handle the response
        if (response.ok) {
          // Download the file
          response.blob().then((blob) => {
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "result.xlsx";
            a.click();
          // window.location.href = "/";
          });
        } else {
          // Request failed
          console.error("Failed to download the file.");
        }
      })
      .catch((error) => {
        // Handle any errors
        console.error("An error occurred while downloading the file:", error);
      });
  });


  


  
});



//loader

setTimeout(function() {
  document.getElementById("loader").style.display = "none";
  document.getElementsById("containermain").style.display = "block";
}, 2000); // Delay for 5 seconds








