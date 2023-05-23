// fetch all Divisions record.

class FetchDivisions { 

    async fetch () {
        const token = localStorage.getItem('token');
        if ( token ) {
            console.log("Storaged Token: ", token);
        
            try {
                const response = await fetch("/login/getdivs", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    console.log('has Token localStorage and Data in fetchEmployeeById: ', data);
        
                    return data;
        
                } else {
                    console.log('Error:', response.statusText);
                }
        
            } catch (err) {
                console.log("Error : ", err.message);
            }
        
        } else {
            console.log("Don't has any token.");

            return [];
        }   
    };
};

export default FetchDivisions ;
