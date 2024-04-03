import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import { json } from 'react-router-dom';

const Loginnew = () => {
  const { handleSubmit, control, setValue, watch } = useForm();
  const [companyOptions, setCompanyOptions] = useState([]);

  const selectedCompany = watch('company');

  useEffect(() => {
    // Fetch company options from API
    axios.get('http://3.91.97.121:3000/api/companyDetails')
      .then(response => setCompanyOptions(response.data))
      .catch(error => console.error('Error fetching company data:', error));
  }, []);

  const fetchCompanyData = selectedCompany => {
    // Fetch other data based on selected company
    axios.get(`http://3.91.97.121:3000/api/companyDetails/${selectedCompany.companyId}`)
      .then(response => {
  
        const data1  =response.data;
        setValue('data2', data1.email|| '');
        setValue('data3', data1.address1 || '');
        setValue('data4', data1.city || '');
        setValue('data5', data1.state || '');
        setValue('data6', data1.pincode || '');
        console.log("data1",data1.email)
      })
      .catch(error => {
        console.error('Error fetching other data:', error);
        // Clear input fields if there's an error
        setValue('data2', '');
        setValue('data3', '');
        setValue('data4', '');
        setValue('data5', '');
        setValue('data6', '');
      });
  };

  const onSubmit = data => {
    console.log(data);
  }; 
  const choice = companyOptions.map(company => {
   return {
    companyId:company.id,
    companyName:company.companyName}
 });
 console.log(choice)
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Select a company:</label>
        <Controller
          name="company"
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              options={choice}
              isClearable
              getOptionLabel={option => option.companyName}
              getOptionValue={option => option.companyId}
              onChange={selectedCompany => {
                field.onChange(selectedCompany);
                if (selectedCompany) {
                  fetchCompanyData(selectedCompany);
                } else {
                  // Clear input fields when no company selected
                  setValue('data2', '');
                  setValue('data3', '');
                  setValue('data4', '');
                  setValue('data5', '');
                  setValue('data6', '');
                }
              }}
            />
          )}
        />

        <div>
          <label>Data 1:</label>
          <Controller
            name="data2"
            control={control}
            render={({ field }) => <input {...field} type="text" />}
          />
        </div>
        <div>
          <label>Data 2:</label>
          <Controller
            name="data3"
            control={control}
            render={({ field }) => <input {...field} type="text" />}
          />
        </div>
        <div>
          <label>Data 3:</label>
          <Controller
            name="data4"
            control={control}
            render={({ field }) => <input {...field} type="text" />}
          />
        </div>
        <div>
          <label>Data 4:</label>
          <Controller
            name="data5"
            control={control}
            render={({ field }) => <input {...field} type="text" />}
          />
        </div>
  <div>
          <label>Data 5:</label>
          <Controller
            name="data6"
            control={control}
            render={({ field }) => <input {...field} type="text" />}
          />
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Loginnew;