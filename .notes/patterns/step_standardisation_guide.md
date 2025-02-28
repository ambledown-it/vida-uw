# Step Component Standardization Guide

## Overview

After analyzing the codebase, we need to standardize how step components handle:

1. Data storage in Zustand store
2. API calls
3. Navigation to the next step

The current implementation shows inconsistencies where some steps directly call `nextStep()`, others use `setStepNextAction()`, and the timing of store updates and API calls varies between components.

## The Navigation System

The `NavigationBar.jsx` component contains a crucial piece of logic for understanding the flow:

```javascript
const handleNext = async () => {
  console.log('Next button clicked, stepNextAction exists:', !!stepNextAction);
  
  try {
    // Check if we have a custom action for the current step
    if (stepNextAction) {
      // Execute the step-specific action
      console.log('Executing step-specific next action');
      await stepNextAction();
    } else {
      console.log('No step-specific action, using default behavior');
      // Default behavior - find and submit the form
      const form = document.querySelector('form');
      if (form) {
        console.log('Form found, submitting it');
        form.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
      } else {
        console.log('No form found, just going to next step');
        // No form and no custom action, just go to next step
        nextStep();
      }
    }
  } catch (error) {
    console.error('Error during next action:', error);
  }
};
```

This shows the intended flow:
1. If a `stepNextAction` exists, it's executed
2. Otherwise, it tries to submit a form
3. If no form exists, it directly calls `nextStep()`

## Standard Pattern

We'll standardize using `setStepNextAction` for all components to control navigation. Here's the consistent pattern:

```javascript
// Create a stepNextAction in a useEffect
useEffect(() => {
  const handleNext = async () => {
    try {
      // 1. Validate form data (if applicable)
      // Skip if validation fails
      
      // 2. Store data in Zustand BEFORE API call
      setStoreData(formData);
      
      // 3. Call API using mutateAsync with await
      await apiMutation.mutateAsync(formData);
      
      // 4. Move to next step after successful API call
      nextStep();
      return true;
    } catch (error) {
      console.error('Error in step:', error);
      // Handle error appropriately
      return false;
    }
  };
  
  // Register the action with the navigation
  setStepNextAction(handleNext);
  
  // Clean up on unmount
  return () => clearStepNextAction();
}, [formData, setStoreData, apiMutation, nextStep, setStepNextAction, clearStepNextAction]);
```

## Step-by-Step Refactoring Guide

### Step 2: LifeAssured.jsx

Current implementation:
- Uses form submission with `onSubmit`
- Calls `setPersonData` after API call
- Directly calls `nextStep()`

Change to:

```javascript
// Add these imports if they're not already there
import React, { useState, useEffect } from 'react';
// ... other imports

function LifeAssured() {
  // Get existing state and actions
  const personData = useAppStore((state) => state.personData);
  const nextStep = useAppStore((state) => state.nextStep);
  const setPersonData = useAppStore((state) => state.setPersonData);
  const setStepNextAction = useAppStore((state) => state.setStepNextAction);
  const clearStepNextAction = useAppStore((state) => state.clearStepNextAction);
  
  // ... existing form setup and state

  // Set up next action handler
  useEffect(() => {
    const handleNext = async () => {
      try {
        // Get form data
        const formData = getValues();
        
        // Validate
        const isValid = await trigger();
        if (!isValid) {
          setShowBanner(true);
          window.scrollTo({ top: 0, behavior: 'smooth' });
          return false;
        }
        
        // Store data in Zustand BEFORE API call
        setPersonData(formData);
        
        // Call APIs
        const personResponse = await addPersonMutation.mutateAsync(formData);
        
        // Update with accurate data from API if needed
        if (personResponse && personResponse !== formData) {
          setPersonData(personResponse);
        }
        
        // Then initialize underwriting with the same form data
        await initUnderwritingMutation.mutateAsync(formData);
        
        // Move to next step
        nextStep();
        return true;
      } catch (error) {
        console.error('Failed to process data:', error);
        setShowBanner(true);
        return false;
      }
    };
    
    setStepNextAction(handleNext);
    
    return () => clearStepNextAction();
  }, [getValues, trigger, setPersonData, addPersonMutation, initUnderwritingMutation, nextStep, setStepNextAction, clearStepNextAction]);

  // Keep existing onSubmit for form submission
  const onSubmit = async (data) => {
    setShowBanner(false);
    try {
      // Store data first
      setPersonData(data);
      
      // Call APIs
      const personData = await addPersonMutation.mutateAsync(data);
      await initUnderwritingMutation.mutateAsync(data);
      
      // Proceed to next step
      nextStep();
    } catch (error) {
      console.error('Failed to process data:', error);
      setShowBanner(true);
    }
  };

  // Rest of component remains unchanged
  // ...
}
```

### Step 3: CoverRequirements.jsx

Current implementation:
- Has form with `handleSubmit`
- Calls API then `nextStep()`

Change to:

```javascript
import React, { useState, useEffect } from 'react';
import { useProductChoice } from '../hooks/useProductChoice';
import useAppStore from '../store/useAppStore';

function CoverRequirements() {
  const [term, setTerm] = useState(10);
  const [sumAssured, setSumAssured] = useState(2000000);
  const [commissionStructure, setCommissionStructure] = useState(0);
  
  // Get product choice mutation
  const productChoiceMutation = useProductChoice();
  
  // Get store actions
  const nextStep = useAppStore((state) => state.nextStep);
  const setStepNextAction = useAppStore((state) => state.setStepNextAction);
  const clearStepNextAction = useAppStore((state) => state.clearStepNextAction);
  
  // Add Zustand setter if needed for storing data
  // const setCoverData = useAppStore((state) => state.setCoverData);
  
  // Set up next action handler
  useEffect(() => {
    const handleNext = async () => {
      try {
        const data = { term, sumAssured, commissionStructure };
        
        // If you need to store in Zustand, do it here
        // setCoverData(data);
        
        // Call API
        await productChoiceMutation.mutateAsync(data);
        
        // Move to next step
        nextStep();
        return true;
      } catch (error) {
        console.error('Failed to update product choice:', error);
        return false;
      }
    };
    
    setStepNextAction(handleNext);
    
    return () => clearStepNextAction();
  }, [term, sumAssured, commissionStructure, productChoiceMutation, nextStep, setStepNextAction, clearStepNextAction]);

  // Keep existing handleSubmit for form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Call the API to update product choice
      await productChoiceMutation.mutateAsync({ 
        term, 
        sumAssured, 
        commissionStructure 
      });
      
      // Explicitly move to the next step after successful API call
      nextStep();
      
      return true;
    } catch (error) {
      console.error('Failed to update product choice:', error);
      return false;
    }
  };

  // Rest of component remains unchanged
  // ...
}
```

### Step 5: PolicyQuotation.jsx

Current implementation:
- Display component without form submission
- No usage of `setStepNextAction`

Change to:

```javascript
import React, { useState, useEffect } from 'react';
import useAppStore from '../store/useAppStore';
// ... other imports

function PolicyQuotation() {
  // ... existing state and selectors
  
  const nextStep = useAppStore((state) => state.nextStep);
  const setStepNextAction = useAppStore((state) => state.setStepNextAction);
  const clearStepNextAction = useAppStore((state) => state.clearStepNextAction);
  const setPremiumData = useAppStore((state) => state.setPremiumData);

  // Set up next action handler
  useEffect(() => {
    const handleNext = async () => {
      try {
        // Store premium data in Zustand
        if (pricingData) {
          setPremiumData(pricingData);
        }
        
        // No API call needed for this step, just move to next step
        nextStep();
        return true;
      } catch (error) {
        console.error('Error moving to next step:', error);
        return false;
      }
    };
    
    setStepNextAction(handleNext);
    
    return () => clearStepNextAction();
  }, [pricingData, setPremiumData, nextStep, setStepNextAction, clearStepNextAction]);

  // Rest of component remains unchanged
  // ...
}
```

### Step 6: Beneficiaries.jsx

Current implementation:
- Uses `onSubmit` function
- Stores data in Zustand before API call
- Calls API then `nextStep()`

Change to:

```javascript
import React, { useState, useEffect } from 'react';
// ... other imports

function Beneficiaries() {
  // ... existing state and selectors
  
  const setStepNextAction = useAppStore((state) => state.setStepNextAction);
  const clearStepNextAction = useAppStore((state) => state.clearStepNextAction);
  const setBeneficiaryData = useAppStore((state) => state.setBeneficiaryData);
  const beneficiaryData = useAppStore((state) => state.beneficiaryData);
  const nextStep = useAppStore((state) => state.nextStep);
  
  // ... existing form setup

  // Set up next action handler
  useEffect(() => {
    const handleNext = async () => {
      try {
        // Get form data
        const data = getValues();
        
        // Validate
        const isValid = await trigger();
        if (!isValid) {
          setFormError('Please correct the form errors before continuing.');
          return false;
        }
        
        // Ensure the total percentage is 100%
        if (totalPercentage !== 100) {
          setFormError('Total allocation must equal 100%. Current total: ' + totalPercentage + '%');
          return false;
        }
        
        // Ensure all beneficiaries have complete data
        if (!validateAllBeneficiaries(data)) {
          setFormError('All beneficiary details must be complete. Please check highlighted sections.');
          return false;
        }
        
        // Check for ID validation errors
        const hasIdErrors = Object.values(idErrors).some(error => error !== null && error !== undefined);
        if (hasIdErrors) {
          setFormError('Please correct the ID number errors before continuing.');
          return false;
        }
        
        // Clean data
        const cleanedBeneficiaries = data.beneficiaries.map(ben => ({
          type: ben.type,
          percentage: parseFloat(ben.percentage),
          idNumber: ben.idNumber,
          firstNames: ben.firstNames,
          surname: ben.surname,
          dob: ben.dob,
          relationshipid: parseInt(ben.relationshipid)
        }));
        
        // Store data in Zustand BEFORE API call
        setBeneficiaryData({
          beneficiaries: cleanedBeneficiaries
        });
        
        // Call API
        await beneficiaryMutation.mutateAsync(cleanedBeneficiaries);
        
        // Move to next step
        nextStep();
        return true;
      } catch (error) {
        console.error('Error submitting beneficiaries:', error);
        setFormError('Failed to submit beneficiaries. Please try again.');
        return false;
      }
    };
    
    setStepNextAction(handleNext);
    
    return () => clearStepNextAction();
  }, [
    getValues, 
    trigger, 
    totalPercentage, 
    idErrors, 
    validateAllBeneficiaries, 
    setBeneficiaryData, 
    beneficiaryMutation, 
    nextStep, 
    setStepNextAction, 
    clearStepNextAction
  ]);

  // Keep existing onSubmit for form submission
  const onSubmit = async (data) => {
    // ... existing implementation
  };

  // Rest of component remains unchanged
  // ...
}
```

## Summary of Key Changes

For each component (except Step 4: Underwriting which has special iframe handling), you should:

1. Add `setStepNextAction` and `clearStepNextAction` to the imported functions from useAppStore
2. Add a `useEffect` that:
   - Creates a `handleNext` function that:
     - Validates data if needed
     - Stores data in Zustand BEFORE API calls
     - Makes API calls with `mutateAsync` and await
     - Calls `nextStep()` after successful API calls
   - Sets this function with `setStepNextAction`
   - Cleans up with `clearStepNextAction`
3. Keep existing form submission handlers for direct form submissions
4. Include all used variables in the dependency array

## Important Notes

- Do not move, change or edit any layout elements that are not involved in this process. 
- Do not change step1 and step4. 


## Additional Recommendations

1. **Error Handling**: Use consistent error handling in all steps
2. **Loading States**: Implement consistent loading states during API calls
3. **Form Validation**: Follow a standard pattern for form validation
4. **Zustand Storage**: Always update the Zustand store before API calls to ensure data persistence

This standardization will make your application more predictable, easier to maintain, and less prone to bugs from inconsistent patterns.
