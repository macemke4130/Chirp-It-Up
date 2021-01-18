import * as mysql from 'mysql';
import chirps from './chirps';
import { login } from '../../../config';

export const Connection = mysql.createConnection( login );

export const Query = (query: string, values?: Array<string | number>) => {
    return new Promise<Array<any>>((resolve, reject) => {
        Connection.query(query, values, (err, results) => {
            if(err) return reject(err);
            return resolve(results);
        });
    });
};

export default {
    chirps
}