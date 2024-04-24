const express = require('express');
const app = express();
const PORT = 4000;
const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'ageesign',
    password: 'ds564',
    port: 5432,
});

app.use(express.json());

const calculateAge = (date) => {
  const today = new Date();
  const birthDate = new Date(date);
  const age = today.getFullYear() - birthDate.getFullYear();
  const month = today.getMonth() - birthDate.getMonth();

  if (month < 0 || (month == 0 && today.getDate() < birthDate.getDate())) {
      age
  }
  return age - 1;
}

const picksign = (date) => {
  const month = date.getMonth() + 1;
  const day = date.getDate();

  if ((month == 1 && day >= 20) || (month == 2 && day <= 18)) {
      return 'Aquario';
  }
  if ((month == 2 && day >= 19) || (month == 3 && day <= 20)) {
      return 'Peixes';
  }
  if ((month == 3 && day >= 21) || (month == 4 && day <= 19)) {
      return 'Aries';
  }
  if ((month == 4 && day >= 20) || (month == 5 && day <= 20)) {
      return 'Touro';
  }
  if ((month == 5 && day >= 21) || (month == 6 && day <= 21)) {
      return 'Gemeos';
  }
  if ((month == 6 && day >= 22) || (month == 7 && day <= 22)) {
      return 'Cancer';
  }
  if ((month == 7 && day >= 23) || (month == 8 && day <= 22)) {
      return 'Leao';
  }
  if ((month == 8 && day >= 23) || (month == 9 && day <= 22)) {
      return 'Virgem';
  }
  if ((month == 9 && day >= 23) || (month == 10 && day <= 22)) {
      return 'Libra';
  }
  if ((month == 10 && day >= 23) || (month == 11 && day <= 21)) {
      return 'Escorpiao';
  }
  if ((month == 11 && day >= 22) || (month == 12 && day <= 21)) {
      return 'Sagitario';
  }
  if ((month == 12 && day >= 22) || (month == 1 && day <= 19)) {
      return 'Capricornio';
}
}



app.get('/usuarios', async (req, res) => {
  try {
      const result = await pool.query('SELECT * FROM usuarios');

      if (result.rowCount == 0) {
          res.json({
              status: 'success',
              message: 'Não há usuários cadastrados',
          });
      } else {
        res.json({
          status: 'success',
          message: 'Usuarios encontrados',
          total: result.rowCount,
          dados: result.rows,
      })
      }

      
  } catch (error) {
      console.error('Erro ao buscar usuarios', error);
      res.status(500).send('Erro ao buscar usuarios');
  }

});

app.get('/usuarios/:id', async (req, res) => {
  const id = req.params.id;

  try {
      const result = await pool.query('SELECT * FROM usuarios WHERE id = $1', [id]);

      if (result.rowCount == 0) {
          return res.status(404).send('Usuario não encontrado');
      }
      res.json({
          status: 'success',
          message: 'Usuario retornado com sucesso',
          dados: result.rows[0],
      });
  } catch (error) {
      console.error('Erro ao buscar usuario', error);
      res.status(500).send('Erro ao buscar usuario');
  }
});

app.post('/usuarios', async (req, res) => {
  const { name, surname, email, birthdate } = req.body;
  const age = calculateAge(new Date(birthdate));
  const sign = picksign(new Date(birthdate));
  try {
      const result = await pool.query('INSERT INTO usuarios (name, surname, email, birthdate, age, sign) VALUES ($1, $2, $3, $4, $5, $6)', [name, surname, email, birthdate, age, sign]);
      res.status(201).json({
          status: 'success',
          message: 'Usuario inserido com sucesso',
          dados: result.rows[0],
      });
  } catch (error) {
      console.error('Erro ao inserir usuario', error);
      res.status(500).send('Erro ao inserir usuario');
  }
});

app.put('/usuarios/:id', async (req, res) => {
  const { id } = req.params;
  const { name, surname, email, birthdate } = req.body;
  const age = calculateAge(new Date(birthdate));
  const sign = picksign(new Date(birthdate));

  try {
      const result = await pool.query('UPDATE usuarios SET name = $1, surname = $2, email = $3, birthdate = $4, age = $5, sign = $6 WHERE id = $7', [name, surname, email, birthdate, age, sign, id]);
      res.status(201).json({
          status: 'success',
          message: 'Usuario atualizado com sucesso',
      });
  } catch (error) {
      console.error('Erro ao atualizar usuario', error);
      res.status(500).send('Erro ao atualizar usuario');
  }
});

app.delete('/usuarios/:id', async (req, res) => {
  id = req.params.id;

  try {
      const result = await pool.query('DELETE FROM usuarios WHERE id = $1', [id]);
      res.json({
          status: 'success',
          message: 'Usuario deletado com sucesso',
      });
  } catch (error) {
      console.error('Erro ao deletar usuario', error);
      res.status(500).send('Erro ao deletar usuario');
  }
});

app.listen(PORT, () => {
  console.log(`Server ON FML ✨ ${PORT}`);
});

app.get('/', (req, res) => {
  res.send();
});