import { gql, useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
import Select from "react-select";

const EDIT_NUMBER = gql`
mutation editAuthor($name: String!, $born: Int!) {
  editAuthor(name: $name, born: $born) {
    name
    born
    bookCount
    id
    }
}
`

const SetBirthYear = ({ setError, authorsResult }) => {
  const [name, setName] = useState(null);
  const [born, setBorn] = useState('');

  const [ editAuthor, result ] = useMutation(EDIT_NUMBER) 

  const options = authorsResult.data.allAuthors.map((a) => ({
    value: a.name,
    label: a.name
  }))

  const submit = async (event) => {
    event.preventDefault();

    const publishedInt = parseInt(born, 10)

    editAuthor({ variables: { name, born: publishedInt }})

    setName(null);
    setBorn("");
  };

  useEffect(() => {
    if(result.data && result.data.editAuthor === null) {
        setError('author not found')
    }
  }, [result.data])

  return (
    <div>
      <h2>Set Birthyear</h2>
      <form onSubmit={submit}>
        <div>
          author:
          <Select
            defaultValue={name}
            onChange={(selectedOption) => setName(selectedOption.value)}
            options={options}
          />
        </div>
        <div>
          born:
          <input
            type="number"
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <div>
          <button type="submit">update born</button>
        </div>
      </form>
    </div>
  );
};

export default SetBirthYear