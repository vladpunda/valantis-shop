import PropTypes from "prop-types";

function ItemsRow({ arrItem }) {
  return arrItem.map((item) => {
    return (
      <tr key={item.id}>
        <td> {item.id}</td>
        <td> {item.product}</td>
        <td>{item.price}</td>
        <td>{item.brand}</td>
      </tr>
    );
  });
}
ItemsRow.propTypes = {
  arrItem: PropTypes.arrayOf(PropTypes.object),
};
export default ItemsRow;
