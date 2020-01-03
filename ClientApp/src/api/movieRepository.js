import axios from 'axios';

export class MovieRepository{

    url = "https://localhost:44366/api";
    config = {
        headers:{ }
    };

    getMovies() {
        return new Promise((resolve, reject) => {
            axios.get(`${this.url}/Movies`, this.config)
                .then(x => resolve(x.data))
                .catch(x => {
                    alert(x);
                    reject();
                });
        });
    }

    getMovieById(id){
        return new Promise((resolve,reject)=>{
            axios.get(`${this.url}/Movies/${id}`, this.config)
            .then(x=>resolve(x.data))
            .catch(x=>{
                // alert(x);
                reject();
            });            
        });
    }

    addMovie(movie){
        return new Promise((resolve,reject) =>{
            axios.post(`${this.url}/Movies/Add`,movie,this.config)
                .then(x=> resolve(x.data))
                .catch(x=>{
                    alert(x);
                    reject();
            });
        });
    }    

    editMovie(id, movie){
        return new Promise((resolve,reject) =>{
            axios.put(`${this.url}/Movies/Edit/${id}`,movie,this.config)
                .then(x=> resolve(x.data))
                .catch(x=>{
                    alert(x);
                    reject();
                });
        });
    }

    deleteMovie(id){
        return new Promise((resolve,reject) =>{
            axios.delete(`${this.url}/Movies/Delete/${id}`, this.config)
                .then(x=> resolve(x.data))
                .catch(x=>{
                    alert(x);
                });
        });
    }

}