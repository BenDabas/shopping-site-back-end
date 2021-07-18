const convertObj = (obj) => {
  const columns = Object.keys(obj);
  const newObj = {};
  columns.forEach((col) => {
    let newColumn = col.split('_');
    if (newColumn.length !== 1) {
      for (let i = 1; i < newColumn.length; i++) {
        newColumn[i] =
          newColumn[i].charAt(0).toUpperCase() + newColumn[i].slice(1);
      }
      const newColumnName = newColumn.join('');
      newObj[newColumnName] = obj[col];
    } else {
      newObj[col] = obj[col];
    }
  });
  return newObj;
};

const createUpdateQuery = (tableName, cols, uniqueParam, uniqueKey) => {
  const query = [`UPDATE ${tableName} SET`];
  const set = [];
  let index;
  cols.forEach((key, i) => {
    set.push(key + ' = ($' + (i + 1) + ')');
    index = i + 2;
  });
  query.push(set.join(', '));
  query.push(`WHERE ${uniqueKey} = '${uniqueParam}' RETURNING *`);
  return query.join(' ');
};

const convertToUnderscore = (obj) => {
  const keys = Object.keys(obj);
  const objToReturn = {};
  keys.forEach((key) => {
    const originalKey = key;
    for (let i = 0; i < key.length; i++) {
      let keyData = obj[originalKey];
      if (key[i] === key[i].toUpperCase()) {
        key =
          key.substring(0, i) +
          '_' +
          key[i].toLowerCase() +
          key.substring(i + 1, key.length);
        i++;
      }
      if (i == key.length - 1) {
        objToReturn[key] = keyData;
      }
    }
  });
  return objToReturn;
};

module.exports = { convertObj, createUpdateQuery, convertToUnderscore };
