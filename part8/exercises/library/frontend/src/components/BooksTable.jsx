const BooksTable = ({ books }) => {
  return (
    <table style={{ margin: '1em 0 1em 0' }}>
      <tbody>
        <tr style={{ textAlign: 'left' }}>
          <th>title</th>
          <th>author</th>
          <th>published</th>
        </tr>
        {books.map((b) => (
          <tr key={b.id}>
            <td>{b.title}</td>
            <td>{b.author.name}</td>
            <td>{b.published}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default BooksTable
