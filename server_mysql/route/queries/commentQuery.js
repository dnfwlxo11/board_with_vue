module.exports = {
    selectComments(params) {
        const sql = [];
        
        sql.push('SELECT ');
        sql.push('* ');
        sql.push('FROM ');
        sql.push('COMMENTS ');
        sql.push('WHERE ');
        sql.push('seq= ');
        sql.push(`${params.id}`);
    
        console.log(sql.join(''));
        return sql.join('');
    },
    
    insertComment(params) {
        const sql = [];
        
        sql.push('INSERT ');
        sql.push('INTO ');
        sql.push('COMMENTS( ');
        sql.push('author, ');
        sql.push('content, ');
        sql.push('pass, ');
        sql.push('date, ');
        sql.push('seq) ');
        sql.push('VALUES (');
        sql.push(`"${params.author}", `);
        sql.push(`"${params.content}", `);
        sql.push(`SHA2(${params.pass}, 256), `);
        sql.push('DEFAULT, ');
        sql.push(`${params.seq})`);
        
        console.log(sql.join(''));
        return sql.join('');
    },
    
    deleteComment(params) {
        const sql = [];
        
        sql.push('DELETE ');
        sql.push('FROM ');
        sql.push('COMMENTS ');
        sql.push('WHERE ');
        sql.push('cid= ');
        sql.push(`${params._id}`);
    
        console.log(sql.join(''));
        return sql.join('');
    }
}