class  OrgUnitsAuth {
  constructor(dbCount) {
    this.db = dbCount;
  }

  testLogin() {
    return (req, res) => {
      const login = req.body.login;
      const passwd = req.body.password;

      res.json({msg: 'Welcome!! ' + login + ': ' + passwd});
    }
  }
}

export default OrgUnitsAuth;
