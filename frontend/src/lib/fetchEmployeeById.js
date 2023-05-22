import DivName from '../components/DivName'
import OuDivName from '../components/OuDivName';

class fetchEmployeeById { 

    constructor(empId) {
        this.empId = empId;
        this.employeeObj = null;
    }

    listEmployeeInfo() {
        if ( this.employeeObj ) {
            const { employeesInfo, userRole, orgUnitDivsGroup, divsGroup } = this.employeeObj;
    
            return    (       
                <ul>
                    <li>Name: {employeesInfo.firstname}, {employeesInfo.lastname}</li>
                    <li>Email: {employeesInfo.email}</li>
                    <li>Address: {employeesInfo.address}</li>
                    <li>Telephone: {employeesInfo.telephone}</li>
                    <li>Loginname: {employeesInfo.loginname}</li>
                    <li>Lastname: {employeesInfo.lastname}</li>
                    <li>password: {employeesInfo.password}</li>
                    <li>user role: {userRole.role}</li>
                    {orgUnitDivsGroup.map(ous => (
                      <li>
                        Organisational Units / Divisions: <OuDivName oudivid={ous} />
                      </li>
                    ))}
                    {divsGroup.map(dvs => (
                      <li>Divisions: <DivName divid={dvs} /> </li>
                    ))}
                </ul> 
            )
        } else {
            return (<></>)
        }
    }

    getHello() {
        if ( this.employeeObj ) {
        const { employeesInfo, userRole } = this.employeeObj;
        console.log("UserRole in fetchEmployeeById: ", userRole );
        const { firstname, lastname } = employeesInfo ;
        return ( <h1>
                    {firstname} , {lastname} ( {userRole.role} )
                 </h1> )
        } else {
            return (<></>)
        }
    }

    //async getEmpInfo() { return this.employeeObj };

    async fetch () {
        console.log("I am in componentDidMount at CreateEmployee");
        const token = localStorage.getItem('token');
        if ( token ) {
            console.log("Storaged Token: ", token);
        
            if (this.empId) {
              try {
                const response = await fetch("/login/finduserbyid/" + this.empId, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
        
                if (response.ok) {
                    const data = await response.json();
                    console.log('has Token localStorage and Data in fetchEmployeeById: ', data);
        
                    this.employeeObj = {
                      orgUnitDivsGroup: data.oudivs ,
                      divsGroup: data.divs,
                      userRole: data.userrole._id,
                      employeesInfo: {
                        firstname: data.firstname,
                        lastname:  data.lastname,
                        email: data.email,
                        address: data.address,
                        telephone: data.telephone,
                        loginname: data.loginname,
                        password: "*********",
                      },
                    };

                    return this.employeeObj;
        
                } else {
                    console.log('Error:', response.statusText);
                }
        
              } catch (err) {
                  console.log("Error : ", err.message);
              }
            }
        
        } else {
            console.log("Don't has any token.");
        }   
    };
};

export default fetchEmployeeById ;
