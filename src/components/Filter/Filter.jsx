import PropTypes from 'prop-types';
import { FilterContainer, InputFilter, LabelFilter } from './Filter.styled';

function Filter({ handlerChangeFilter, value }) {
    return (
        <FilterContainer>
            <LabelFilter htmlFor="filter">Find contacts by name:</LabelFilter>
            <InputFilter
                id="filter"
                type="text"
                name="filter"
                onChange={handlerChangeFilter}
                value={value}
            />
        </FilterContainer>
    );
}

Filter.propTypes = {
    handlerChangeFilter: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
};

export default Filter;