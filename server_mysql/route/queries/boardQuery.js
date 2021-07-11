module.exports = {
    selectContents() {
        const sql = [];
        
        sql.push('SELECT ');
        sql.push('* ');
        sql.push('FROM ');
        sql.push('BOARD');

        console.log(sql.join(''));
        return sql.join('');
    },

    selectContent(params) {
        const sql = [];
        
        sql.push('SELECT ');
        sql.push('* ');
        sql.push('FROM ');
        sql.push('BOARD ');
        sql.push('WHERE ');
        sql.push('seq= ');
        sql.push(`${params.id}`);

        console.log(sql.join(''));
        return sql.join('');
    },

    insertContent(params) {
        const sql = [];
        
        sql.push('INSERT ');
        sql.push('INTO ');
        sql.push('BOARD( ');
        sql.push('nickname, ');
        sql.push('title, ');
        sql.push('content, ');
        sql.push('password, ');
        sql.push('date) ');
        sql.push('VALUES (');
        sql.push(`"${params.nickname}", `);
        sql.push(`"${params.title}", `);
        sql.push(`"${params.content}", `);
        sql.push(`SHA2(${params.password}, 256), `);
        sql.push('DEFAULT)');

        console.log(sql.join(''));
        return sql.join('');
    },

    deleteContent(params) {
        const sql = [];
        
        sql.push('DELETE ');
        sql.push('FROM ');
        sql.push('BOARD ');
        sql.push('WHERE ');
        sql.push('seq= ');
        sql.push(`${params.id}`);

        console.log(sql.join(''));
        return sql.join('');
    }
}