import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './BoatDetail.css';
import { GiCrossMark } from "react-icons/gi";
import { Link } from 'react-router-dom';
const BoatDetail = () => {
    const { id } = useParams();
    const [boat, setBoat] = useState(null);
    const navigate = useNavigate();
    const isLogged = useSelector(state => state.auth.isAuthenticated);

    useEffect(() => {
        fetch(`http://localhost:3001/boatData`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                const selectedBoat = data.find(boat => boat.id === parseInt(id));
                setBoat(selectedBoat);
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
    }, [id]);

    const handleBookClick = () => {
        if (isLogged) {
            navigate('/booking', { state: { boat } });
        } else {
            alert('You need to be logged in to book a boat.');
            navigate('/sign-in');
        }
    };

    if (!boat) {
        return <div>Loading...</div>;
    }

    return (
    <div>
        <Link to="/">
        <GiCrossMark className="cross8" />
      </Link>
        <div className="boat-detail-container">
            <div className="boat-detail-main">
                <img src={boat.image} alt={boat.name} className="boat-detail-image" />
                <div className="boat-detail-info">
                    <h1>{boat.name}</h1>
                    <p>{boat.description}</p>
                    <p className="boat-detail-price">{boat.price}</p>
                    <button className="book-button" onClick={handleBookClick}>
                        Book
                    </button>
                </div>
            </div>
            <div className="boat-detail-extra">
                <h2>Additional Images</h2>
                <div className="boat-images">
                    {boat.extraImages.map((img, index) => (
                        <img key={index} src={img} alt={`${boat.name} ${index + 1}`} className="boat-extra-image" />
                    ))}
                </div>
                <h2>Details</h2>
                <ul className="boat-extra-details">
                    <li><strong>Type:</strong> {boat.type}</li>
                    <li><strong>Location:</strong> {boat.location}</li>
                    <li><strong>Capacity:</strong> {boat.capacity} people</li>
                    <li><strong>Features:</strong> {boat.features.join(', ')}</li>
                </ul>
            </div>
        </div>
        </div>
    );
};

export default BoatDetail;