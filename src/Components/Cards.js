function Card(props) {
    return(
        <div className="col mb-5">
            <div className="card" style={{width: "18rem"}}>
                <img src={props.src} className="card-img-top" alt={props.src} />
            </div>
        </div>
    )
}
export default Card;