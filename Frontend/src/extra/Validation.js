function valid(cityto, cityfrom, datesince, dateto) {
    if(cityto == "" || cityfrom == "" || datesince == "" || dateto == "") return false;
    return true;
}

exports.valid = valid;