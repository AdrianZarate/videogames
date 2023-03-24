import {useState} from 'react';
import axios from 'axios'

const Form = () => {

    const [form, setForm] = useState({
        name: "",
        description: "",
        platforms: '',
        image: "",
        release_date: "",
        rating: "",
        genreId: []
    });
    
    // leer lo que escribi 
    const changeHandler = (event) => {
        const property = event.target.name;
        const value = event.target.value;
        
        // validate({...form, [property]: value});

        if (property === 'genreID') {
            setForm({...form, [property]: property.push(value)});
        } else {
            setForm({...form, [property]: value});
        }
    }

    // const [errors, setErrors] = useState({
    //     name: "",
    //     description: "",
    //     platforms: '',
    //     image: "",
    //     release_date: "",
    //     rating: "",
    //     genreId: []
    // });
    
    // const validate = (form) => {
    //     if (/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(form)) {
            
    //     } else {
            
    //     }
    // }

    const submitHandler = (event) => {
        event.preventDefault();
        axios.post('http://localhost:3001/videogames', form)
        .then(res => alert(res))
        .catch(err => alert(err))
    }

    return (
        <form onSubmit={submitHandler}>
            <div>
                <laber for='name'>Nombre</laber>
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
                <aber>Plataformas</aber>
                <input type='text' value={form.platforms} onChange={changeHandler} name='platforms'/>
            </div>
            <div>
                <laber>Fecha de lanzamiento</laber>
                <input type='date' value={form.release_date} onChange={changeHandler} name='release_date'/>
            </div>
            <div>
                <laber>Rating</laber>
                <input type='number' value={form.rating} onChange={changeHandler} name='rating'/>
            </div>
            <div>
                <laber>Generos</laber>
                <input type='number' value={form.genreId} onChange={changeHandler} name='genreId' />
            </div>
            <button type='submit'>submit</button>
        </form>
    )
}

export default Form;