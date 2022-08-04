import React, { useState } from "react";
import { ButtonSell } from "../Assets/Components/Button/ButtonSell/ButtonSell";
import { ModalDelete } from "../Assets/Components/Modal/ModalDelete";
import { ModalOffers } from "../Assets/Components/Modal/ModalOffers";
import { ModalWarning } from "../Assets/Components/Modal/ModalWarning";

export const Dummy = () => {
  const [isClosed, setisClosed] = useState(true);

  const handleModal = () => {
    setisClosed(!isClosed);
  };

  const test = () => {
    var axios = require('axios');

    var config = {
      method: 'get',
      url: 'https://sneakers-staging.herokuapp.com/transaction/display/seller/13',
      headers: { 
        'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJzZWxsZXIzQG1haWwuY29tIiwicm9sZSI6WyJTRUxMRVIiXSwiaXNzIjoiaHR0cHM6Ly9zbmVha2Vycy1zdGFnaW5nLmhlcm9rdWFwcC5jb20vbG9naW4iLCJleHAiOjE2NTgyMDY2MTV9.HHkBHygPZzCpu7aof-7z_ABxprE9G_nWIWBmcSbKz61pAxQn2axzvfCYAx9JgqIFstX87TiCa_-xFNwXsWuSqQ'
      }
    };
    
    axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
      console.log(error);
    });
    
  };

  return (
    <div>
      {/* {isClosed ? null : <ModalWarning closed={()=>{handleModal()}}/> }

      <div>aaddsdddddddddddddddddddddd</div> */}
      <button onClick={()=>{test()}}>cek</button>


    </div>
  );
};
