
export const checkEmail = (email) => {
    let index_found_at, index_found_dot;
    //check if the string exists
    if (email !== "undefined") {
        index_found_at = email.search("@");

        // Find the "@"
        if (index_found_at > -1) {
            //Check if there is only one "@" and if there is a "." after 3 char after "@"
            if (email.includes("@", index_found_at + 1) !== true && email.includes(".", email.indexOf("@") + 3) === true) {
                index_found_dot = email.indexOf(".", index_found_at);
                //Check if there is only 1 "." after "@" and if the given string doesn't start or end with "@" and/or "."
                if (email.includes(".", index_found_dot + 1) !== true && (email.startsWith(".") || email.startsWith("@") || email.endsWith(".") || email.endsWith("@")) !== true) return true;
            }
        }
    }
}
export const checkPostalCode = (postal) => {
    return (postal.length > 4 && /^\d+$/.test(postal)) ? true : false;
}

export const checkPassword = (password) => (password.length > 8 && /\d/.test(password) && /[a-zA-Z]/g.test(password)) ? true : false
