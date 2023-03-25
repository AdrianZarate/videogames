import { useEffect, useState } from "react";
import { useDispatch, useSelector} from "react-redux";
import { genresSelected, getVideogames, getVideogamesName, ordenarAlfabeticamente, ordenarRating, ordenarCreated } from "../../redux/actions";
import axios from "axios";

const SearchBar = () => {

    const dispatch = useDispatch();

    const genres = useSelector(state => state.genres);

    // Estados
    const [name, setName] = useState('');

    const [options, setOptions] = useState({
       optionsGenres: false,
       optionsAlfab: false,
       optionsRating: false,
    });

    const [genresChecked, setGenresChecked] = useState([]);

    const [alfabeto, setAlfabeto] = useState('');

    const [rating, setRating] = useState('');

    const [created, setCreated] = useState('');

    const [validar, setValidar] = useState({
        validarAlfab: false,
        validarRating: false,
        validarCreated: false
    })
    
    // validar Name
    const verificarNombre = async () => {
        if (name.trim()) {
            await axios.get(`http://localhost:3001/videogames?name=${name}`)
            .then(res => dispatch(getVideogamesName(name)))
            .catch(err => alert(err.response.data))
        } else {
            alert('ingresa un nombre para buscar')
        }
    }
    
    // leer y modifica name
    const changeHandler = (event) => {
        setName(event.target.value);
    }

    // depliega las opcions
    const toggleOptions = (event) => {
        const {value} = event.target;
        setOptions({...options, [value]: !options[value]});
    }

    // actualizar el estado de los genres seleccionados
    const handleOptionChange = (event) => {
        const {value, checked} = event.target;

        if (checked) {
            setGenresChecked([ ...genresChecked, value ]);
        } else {
            setGenresChecked(
                genresChecked.filter((nameGenre) => nameGenre !== value),
            );
        }
    }

    // actualizar el estado de alfabeto
    const handleAlfabetico = (event) => {
        const {value, checked} = event.target;

        if (checked) {
            setAlfabeto(value)
            // dispatch(ordenarAlfabeticamente(alfabeto))
        } else {
            setAlfabeto('');
            setValidar({...validar, validarAlfab: !validar.validarAlfab})
            // dispatch(getVideogames())
        }
    }
    
    // actualizar el estado de rating
    const handleRating = (event) => {
        const {value, checked} = event.target;
        if (checked) {
            setRating(value)
        } else {
            setRating('');
            setValidar({...validar, validarRating: !validar.validarRating})
        }
    }

    const handleCreated = (event) => {
        const {value, checked} = event.target;
        if (checked) {
            setCreated(value)
        } else {
            setCreated('');
            setValidar({...validar, validarCreated: !validar.validarCreated})
        }
    }
    
    useEffect(() => {
        console.log('estoy con genresCkecked');
        dispatch(genresSelected(genresChecked))
        
    },[genresChecked])
    
    useEffect(() => {
        if (!alfabeto && validar.validarAlfab) {
            dispatch(getVideogames())
        } 
        if (alfabeto) {
            dispatch(ordenarAlfabeticamente(alfabeto))
        }
        
        console.log('si escucho al alfabeto alv', alfabeto);
    },[alfabeto]);
    
    useEffect(() => {
        if (!rating && validar.validarRating) {
            dispatch(getVideogames())
        }
        if (rating) {
            dispatch(ordenarRating(rating))
        }
    },[rating])

    useEffect(() => {
        if (!created && validar.validarCreated) {
            dispatch(getVideogames())
        }
        if (created) {
            dispatch(ordenarCreated(created))
        }
    },[created])

    return (
        <div>
            <input placeholder="Videogame..." onChange={changeHandler}></input>
            <button onClick={() => verificarNombre()}>buscar</button>
            <hr/>
            <button onClick={toggleOptions} value='optionsGenres'>Filtrar por genres</button>
            {options.optionsGenres && ( 
                <div>
                    {genres.map(genre => {
                        const isChecked = genresChecked.includes(genre.name)
                        return (
                        <label>
                            {genre.name}
                            <input
                            type='checkbox'
                            value={genre.name}
                            name='genres'
                            checked={isChecked}
                            onChange={handleOptionChange}
                            />
                        </label>
                    )})}
                </div>
            )}
            <button onClick={toggleOptions} value='optionsAlfab'>Alfabeticamente</button>
            {options.optionsAlfab && (
                <div>
                    <label> 
                        ascendente
                        <input
                        type='checkbox'
                        value='ascendente'
                        checked={alfabeto === 'ascendente'}
                        onChange={handleAlfabetico}
                        />
                    </label>
                    <label> 
                        descendente
                        <input
                        type='checkbox'
                        value='descendente'
                        checked={alfabeto === 'descendente'}
                        onChange={handleAlfabetico}
                        />
                    </label>
                </div>
            )}
            <button onClick={toggleOptions} value='optionsRating'>por Rating</button>
            {options.optionsRating && (
                <div>
                    <label> 
                        ascendente
                        <input
                        type='checkbox'
                        value='ascendente'
                        checked={rating === 'ascendente'}
                        onChange={handleRating}
                        />
                    </label>
                    <label> 
                        descendente
                        <input
                        type='checkbox'
                        value='descendente'
                        checked={rating === 'descendente'}
                        onChange={handleRating}
                        />
                    </label>
                </div>
            )}
            <button onClick={toggleOptions} value='optionsCreated'>tipo de game</button>
            {options.optionsCreated && (
                <div>
                    <label> 
                        created
                        <input
                        type='checkbox'
                        value='created'
                        checked={created === 'created'}
                        onChange={handleCreated}
                        />
                    </label>
                    <label> 
                        not created
                        <input
                        type='checkbox'
                        value='notCreated'
                        checked={created === 'notCreated'}
                        onChange={handleCreated}
                        />
                    </label>
                </div>
            )}
        </div>
    )
}

export default SearchBar;