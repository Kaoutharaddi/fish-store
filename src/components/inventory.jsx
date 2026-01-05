import AddFishForm from "./AddFishForm"; 

const Inventory = (props) => {
 return (
 <div className="Inventory">
 <h2>Inventory</h2>
 <button onClick={props.loadSampleFishes}>Load Sample Fishes</button>
 <AddFishForm addFish={props.addFish} />
 </div>
 );
};

export default Inventory;