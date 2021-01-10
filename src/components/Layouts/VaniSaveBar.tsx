import { ContextualSaveBar } from '@shopify/polaris';
import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { VaniContext } from '../../utils/contexts/VCScontext';
import { VaniActionEnum } from '../../utils/type.helper';
import { Customize } from '@prisma/client';
import axios from 'axios';

export const VaniSaveBar: React.FC = () => {
  const { state, dispatch } = useContext(VaniContext);
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const stateRef = useRef<Customize | undefined>(undefined);

  const handleSubmit = useCallback(() => {
    setLoading(true);
    const fn = async () => {
      try {
        const { data } = await axios.put<Customize>('/api/customizes', state.customize);
        stateRef.current = data;
        dispatch({
          type: VaniActionEnum.SET_API_VALUES,
          customize: stateRef.current,
          product: state.product
        });
        setLoading(false);
      } catch (err) {
        console.log(err.message);
        setLoading(false);
      }
    };
    fn();
  }, [state]);

  useEffect(() => {
    if (state.customize?.shop && !stateRef.current) {
      stateRef.current = state.customize;
    }
    if (JSON.stringify(stateRef.current) === JSON.stringify(state.customize)) {
      setShow(false);
    } else {
      setShow(true);
    }
    console.log(JSON.stringify(stateRef.current) === JSON.stringify(state.customize));
  }, [state]);

  return (
    <>
      {show && (
        <>
          <ContextualSaveBar
            alignContentFlush
            message="Unsaved changes"
            saveAction={{
              onAction: handleSubmit,
              loading
            }}
            discardAction={{
              onAction: () => {
                dispatch({
                  type: VaniActionEnum.SET_API_VALUES,
                  customize: stateRef.current,
                  product: state.product
                });
                setShow(false);
              }
            }}
          />
          <div style={{ marginTop: '8rem' }} />
        </>
      )}
    </>
  );
};
