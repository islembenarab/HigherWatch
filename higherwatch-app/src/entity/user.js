class userDetails {
    constructor(
   user
    ) {
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.email = user.email;
        this.gender = user.gender;
        this.address = user.address;
        this.phone = user.phone;
        this.birthDate = user.birthDate;
        this.structure = user.structure;
        this.enabled = user.enabled;
        this.username = user.username;
        this.authorities = user.authorities;
        this.credentialsNonExpired = user.credentialsNonExpired;
        this.accountNonExpired = user.accountNonExpired;
        this.accountNonLocked = user.accountNonLocked;
    }

    // Add any additional methods or functionality here
}
