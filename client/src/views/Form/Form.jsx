import {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postVideogame } from '../../redux/actions';
import style from './Form.module.css'

const Form = () => {

    const dispatch = useDispatch()

    const genres = useSelector(state => state.genres);

    const [form, setForm] = useState({
        name: "",
        description: "",
        platforms: [],
        image: "",
        release_date: "",
        rating: null,
        genreId: []
    });

    const [options, setOptions] = useState(false)
    
    const toggleOptions = (event) => {
        event.preventDefault() 
        console.log('despliegue');
        setOptions(!options)
    }
    
    // leer lo que escribi 
    const changeHandler = (event) => {
        const {name, value, checked} = event.target;
        
        // validate({...form, [property]: value});
        if (name === 'genreId') {
            if (checked) {
                setForm({...form, [name]: [...form[name], (Number(value))]})
            } else {
                const actualizandoGenreId = form.genreId.filter(id => id !== Number(value))
                setForm({...form, [name]: actualizandoGenreId})
            }
        } 

        let validarName = /^[a-zA-Z\s]*$/;
        if (name === 'name' && validarName.test(value)) {
            setForm({...form, [name]: value})
        } else if (name === 'name' && !validarName.test(value)) {
            alert('ingrese el solo letras')
        }

        let validarImage = /(\.jpg|\.jpeg|\.png)$/i;
        if (name === 'image' && validarImage.test(value)) {
            setForm({...form, [name]: value});
        } else if (name === 'image' && !validarImage.test(value)) {
            alert('Ingrese solo imágenes con extensión .jpg, .jpeg o .png');
        }

        if (name === 'rating') {
            setForm({...form, [name]: Number(value)})
        }

        if (name === 'platforms') {
            setForm({...form, [name]: [value]})
        }

        if (name !== 'rating' && name !== 'platforms' && name !== 'genreId' && name !== 'name') {
            setForm({...form, [name]: value});
        }
        
        console.log(form);
        
    }
      
    function formatDate(date) {
        const year = date.getFullYear();
        const month = ("0" + (date.getMonth() + 1)).slice(-2);
        const day = ("0" + date.getDate()).slice(-2);
        return `${year}-${month}-${day}`;
    }
      
    const submitHandler = async (event) => {
        console.log('es la parte del post');
        event.preventDefault();
        const values = Object.values(form);
        if (values.includes('') || values.includes(null)) {
            alert('Por favor completa todos los campos')
        } else {
            dispatch(postVideogame(form))
        }
    }

    return (
        <form onSubmit={submitHandler} className={style.formulario}>
            <div>
                <laber >Nombre</laber>
                <input type='text' value={form.name} onChange={changeHandler} name='name'/>
            </div>
            <div>
                <laber>Imagen</laber>
                <input type='text' value={form.image} onChange={changeHandler} name='image'/>
            </div>
            <div>
                <laber>Descripción</laber>
                <input type='text' value={form.description} onChange={changeHandler} name='description'/>
            </div>
            <div>
                <laber>Plataformas</laber>
                <input type='text' value={form.platforms} onChange={changeHandler} name='platforms'/>
            </div>
            <div>
                <label>Fecha de lanzamiento</label>
                <input type='date' value={form.release_date ? formatDate(new Date(form.release_date)) : ''} onChange={changeHandler} name='release_date' />
            </div>
            <div>
                <laber>Rating</laber>
                <input type='number' value={form.rating} onChange={changeHandler} name='rating'/>
            </div>
            <div>
                <button onClick={toggleOptions}>Despliegue generos</button>
                {options && (
                    <div className={style.generos}>
                        {genres.map((genre, index) => {
                            return (
                                <label>
                                    {genre.name}
                                    <input 
                                        type='checkbox'
                                        value={index}
                                        name='genreId'
                                        // checked={isChecked}
                                        onChange={changeHandler}
                                    />
                                </label>
                            )
                        })}
                    </div>
                )}
            </div>
            <button type='submit'>submit</button>
        </form>
    )
}

export default Form;