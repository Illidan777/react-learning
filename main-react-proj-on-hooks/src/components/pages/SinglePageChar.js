import SinglePageEntity from "../common/SinglePageEntity";
import useMarvelService from "../../services/UseMarvelService";


const SinglePageChar = () => {
    const {getCharacter} = useMarvelService();
 return (
     <SinglePageEntity
         goBackRoute="/"
         fetchFunction={(id) => getCharacter(id)}
         useServiceHook={useMarvelService}
     >
      {({ name, description}) => (
          <>
           <h2>{name}</h2>
           <p>{description}</p>
          </>
      )}
     </SinglePageEntity>
 );
};

export default SinglePageChar;
