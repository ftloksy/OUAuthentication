// fetch Division record By Id.

class FetchDivisionById {
    
    async fetchDivById (id) {
        const token = localStorage.getItem('token');
        if ( token ) {
            console.log("Storaged Token: ", token);
        
            try {
                console.log("FetchDivById: ", id)
                const response = await fetch("/login/getdivnamebyid/" + id, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    console.log('has Token localStorage and Data in fetchEmployeeById: ', data);
        
                    return data.name;
        
                } else {
                    console.log('Error:', response.statusText);
                    return (<></>)
                }
        
            } catch (err) {
                console.log("Error : ", err.message);
                return (<></>)
            }
        
        } else {
            console.log("Don't has any token.");

            return (<></>);
        }   
    };
};

export default FetchDivisionById ;
