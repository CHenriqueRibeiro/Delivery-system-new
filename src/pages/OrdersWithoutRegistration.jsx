import {
  Alert,
  Box,
  Radio,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DeliveryDiningOutlinedIcon from '@mui/icons-material/DeliveryDiningOutlined';
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined';
import { NavLink } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useCarrinho } from '../context/useCarrinho';
import { useFormat } from '../utils/useFormat';
import './Order.css';

const schema = yup
  .object({
    estado: yup.string().required(
      <Typography
        variant="caption"
        style={{ color: 'red', marginLeft: '5px' }}
      >
        Campo obrigatório
      </Typography>
    ),
    cidade: yup.string().required(
      <Typography
        variant="caption"
        style={{ color: 'red', marginLeft: '5px' }}
      >
        Campo obrigatório
      </Typography>
    ),
    bairro: yup.string().required(
      <Typography
        variant="caption"
        style={{ color: 'red', marginLeft: '5px' }}
      >
        Campo obrigatório
      </Typography>
    ),
    complemento: yup.string(),
    casaApto: yup.string().required(
      <Typography
        variant="caption"
        style={{ color: 'red', marginLeft: '5px' }}
      >
        Campo obrigatório
      </Typography>
    ),
    logradouro: yup.string().required(
      <Typography
        variant="caption"
        style={{ color: 'red', marginLeft: '5px' }}
      >
        Campo obrigatório
      </Typography>
    ),
    cep: yup.string().required(
      <Typography
        variant="caption"
        style={{ color: 'red', marginLeft: '5px' }}
      >
        Campo obrigatório
      </Typography>
    ),
    // formaDeEntrega: yup.string().required(),
    telefone: yup
      .number()
      .required()
      .typeError(
        <Typography
          variant="caption"
          style={{ color: 'red', marginLeft: '5px' }}
        >
          Campo obrigatório
        </Typography>
      ),
    nome: yup.string().required(
      <Typography
        variant="caption"
        style={{ color: 'red', marginLeft: '5px' }}
      >
        Campo obrigatório
      </Typography>
    ),
    formaDePagamento: yup.string().required(
      <Typography
        variant="caption"
        style={{ color: 'red', marginLeft: '5px' }}
      >
        Escolha um das formas de pagamento
      </Typography>
    ),
  })
  .required();

const Order = () => {
  // const [open, setOpen] = useState(false);
  const { cart, calculateSubtotal } = useCarrinho();
  const [showAlert, setShowAlert] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [selectedValueDelivery, setSelectedValueDelivery] =
    useState(
      sessionStorage.getItem('selectedValueDelivery') ||
        'Entrega'
    );

  const handleChangeDelivery = (event) => {
    const { value } = event.target;
    setSelectedValueDelivery(value);

    const savedData =
      JSON.parse(
        sessionStorage.getItem('pedido sem cadastro')
      ) || {};

    const updatedData = {
      ...savedData,
      formaDeEntrega: value,
    };

    sessionStorage.setItem(
      'pedido sem cadastro',
      JSON.stringify(updatedData)
    );
  };

  const createWhatsAppMessage = (data) => {
    const sessionStorageData = JSON.parse(
      sessionStorage.getItem('itensSelecionados')
    );

    if (sessionStorageData) {
      let message = `Olá ${data.nome},\n\nTelefone: ${data.telefone}\n\n---------------------------------------\n`;

      const itemsPedido = sessionStorageData.map((item) => {
        const sabor = [item.sabor];
        const pedido = sabor.map(
          (itemPedido) => ` ${itemPedido}`
        );
        return pedido;
      });
      message += `Pedido: ${itemsPedido}\n---------------------------------------\n`;

      message += `CEP: ${data.cep}\n`;

      message += `Casa/Apto: ${data.casaApto}\n`;

      message += `Rua: ${data.logradouro}\n`;
      message += `Complemento: ${data.complemento}\n`;
      message += `Bairro: ${data.bairro}\n`;
      message += `Cidade: ${data.cidade}\n`;
      message += `Estado: ${data.estado}\n`;

      message += `---------------------------------------\n`;

      message += `Forma de Pagamento: ${data.formaDePagamento}\n`;

      const totalValue = calculateSubtotal(cart);
      message += `Valor Total: R$ ${totalValue.toFixed(2)}`;
      console.log(message);

      const whatsappLink = `https://api.whatsapp.com/send?phone=55${data.telefone}&text=${message}`;

      window.open(whatsappLink);
    } else {
      alert('Não existe itens no carrinho');
    }
  };

  const onSubmit = (data) => {
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
      createWhatsAppMessage(data);
    }, 2000);
  };

  return (
    <Box className="screenOrder">
      <Box className="headerOrder">
        <Box className="iconAndText">
          <NavLink to="/" style={{ color: '#f9e9df' }}>
            <ArrowBackIcon />
          </NavLink>
          <Typography variant="h6">Checkout</Typography>
        </Box>
      </Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box className="contentOrder">
          <Box className="cardPersonalData">
            <Box className="contentPersonalData">
              <Box className="backgroundTitle"></Box>
              <Typography
                variant="h6"
                className="editInformation"
              >
                Quem pediu
              </Typography>
              <Box className="nameAndTelephone">
                <Typography
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                  }}
                  variant="h6"
                >
                  <label>Nome:</label>
                  <input
                    type="text"
                    name="nome"
                    style={{
                      textTransform: 'capitalize',
                      border: '1px #f16d2f solid',
                      borderRadius: '8px',
                      paddingLeft: '.5rem',
                      fontFamily: 'Roboto',
                      fontWeight: '500',
                      marginLeft: '.5rem',
                    }}
                    // value={pedidoSemCadastro.nome}
                    // onChange={handleInputChange}
                    {...register('nome')}
                  />
                  <p>{errors.nome?.message}</p>
                </Typography>
                <Typography
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                  }}
                  variant="h6"
                >
                  <label>Telefone:</label>
                  <input
                    // mask="99 9 99999999"
                    // maskChar={null}
                    placeholder="(99) 99999-9999"
                    type="number"
                    name="Telefone"
                    style={{
                      textTransform: 'capitalize',
                      border: '1px #f16d2f solid',
                      borderRadius: '8px',
                      paddingLeft: '.5rem',
                      fontFamily: 'Roboto',
                      fontWeight: '500',
                      marginLeft: '.5rem',
                    }}
                    // value={pedidoSemCadastro.Telefone}
                    // onChange={handleInputChange}
                    {...register('telefone')}
                  />
                  <p>{errors.telefone?.message}</p>
                </Typography>
              </Box>
            </Box>
          </Box>

          <Box className="cardDeliveryMethod">
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-around',
                height: '100%',
                width: '100%',
              }}
            >
              <Box className="backgroundTitleDelivery"></Box>
              <Typography
                variant="h6"
                className="editInformation"
              >
                Forma de Entrega
              </Typography>
              <Box className="deliveryMethod">
                <Box
                  display={'flex'}
                  width={'100%'}
                  alignItems={'center'}
                >
                  <Radio
                    checked={
                      selectedValueDelivery === 'Entrega'
                    }
                    onChange={handleChangeDelivery}
                    value="Entrega"
                  />
                  <DeliveryDiningOutlinedIcon />
                  <Typography variant="h6" sx={{ pl: 2 }}>
                    Delivery
                  </Typography>
                </Box>
                <Box display={'flex'} alignItems={'center'}>
                  <Radio
                    checked={
                      selectedValueDelivery === 'Retirada'
                    }
                    onChange={handleChangeDelivery}
                    value="Retirada"
                  />
                  <StorefrontOutlinedIcon />
                  <Typography variant="h6" sx={{ pl: 2 }}>
                    Retirar no Local
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>

          <Box className="cardDeliveryAddress">
            <Box className="contentDeliveryAddress">
              <Box className="backgroundTitleAddress"></Box>
              <Typography
                variant="h6"
                className="editInformationAddress"
              >
                Entregar no Endereço
              </Typography>
              <Box className="addressData">
                <Typography
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                  }}
                  variant="h6"
                >
                  <label>Cep:</label>
                  <input
                    style={{
                      textTransform: 'capitalize',
                      border: '1px #f16d2f solid',
                      borderRadius: '8px',
                      paddingLeft: '.5rem',
                      fontFamily: 'Roboto',
                      fontWeight: '500',
                      marginLeft: '.5rem',
                    }}
                    // mask="99999-999"
                    // maskChar={null}
                    name="cep"
                    // value={
                    //   selectedValueDelivery === 'Entrega'
                    //     ? pedidoSemCadastro.cep
                    //     : '61658-000'
                    // }
                    // onChange={handleInputChange}
                    disabled={
                      selectedValueDelivery === 'Retirada'
                    }
                    {...register('cep')}
                  />
                  <p>{errors.cep?.message}</p>
                </Typography>

                <Typography
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                  }}
                  variant="h6"
                >
                  <label>Rua/ Av :</label>
                  <input
                    style={{
                      textTransform: 'capitalize',
                      border: '1px #f16d2f solid',
                      borderRadius: '8px',
                      paddingLeft: '.5rem',
                      fontFamily: 'Roboto',
                      fontWeight: '500',
                      marginLeft: '.5rem',
                    }}
                    name="rua"
                    // value={
                    //   selectedValueDelivery === 'Entrega'
                    //     ? pedidoSemCadastro.rua
                    //     : 'Alameda luiza'
                    // }
                    // onChange={handleInputChange}
                    disabled={
                      selectedValueDelivery === 'Retirada'
                    }
                    {...register('logradouro')}
                  />
                  <p>{errors.logradouro?.message}</p>
                </Typography>
                <Typography
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                  }}
                  variant="h6"
                >
                  <label>Numero:</label>
                  <input
                    style={{
                      textTransform: 'capitalize',
                      border: '1px #f16d2f solid',
                      borderRadius: '8px',
                      paddingLeft: '.5rem',
                      fontFamily: 'Roboto',
                      fontWeight: '500',
                      marginLeft: '.5rem',
                    }}
                    spellCheck="false"
                    name="Numero"
                    // value={
                    //   selectedValueDelivery === 'Entrega'
                    //     ? pedidoSemCadastro.numero
                    //     : '300 B'
                    // }
                    // onChange={handleInputChange}
                    disabled={
                      selectedValueDelivery === 'Retirada'
                    }
                    {...register('casaApto')}
                  />
                  <p>{errors.casaApto?.message}</p>
                </Typography>
                <Typography
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                  }}
                  variant="h6"
                >
                  <label>Complemento :</label>
                  <input
                    style={{
                      textTransform: 'capitalize',
                      border: '1px #f16d2f solid',
                      borderRadius: '8px',
                      paddingLeft: '.5rem',
                      fontFamily: 'Roboto',
                      fontWeight: '500',
                      marginLeft: '.5rem',
                    }}
                    // value={
                    //   selectedValueDelivery === 'Entrega'
                    //     ? pedidoSemCadastro.referencia
                    //     : 'Prox.a Lagoa'
                    // }
                    // onChange={handleInputChange}
                    disabled={
                      selectedValueDelivery === 'Retirada'
                    }
                    {...register('complemento')}
                  />
                  <p>{errors.complemento?.message}</p>
                </Typography>

                <Typography
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                  }}
                  variant="h6"
                >
                  <label> Bairro:</label>
                  <input
                    style={{
                      textTransform: 'capitalize',
                      border: '1px #f16d2f solid',
                      borderRadius: '8px',
                      paddingLeft: '.5rem',
                      fontFamily: 'Roboto',
                      fontWeight: '500',
                      marginLeft: '.5rem',
                    }}
                    spellCheck="false"
                    name="Bairro"
                    // value={
                    //   selectedValueDelivery === 'Entrega'
                    //     ? pedidoSemCadastro.bairro
                    //     : 'Lagoa Do Banana'
                    // }
                    // onChange={handleInputChange}
                    disabled={
                      selectedValueDelivery === 'Retirada'
                    }
                    {...register('bairro')}
                  />
                  <p>{errors.bairro?.message}</p>
                </Typography>

                <Typography
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                  }}
                  variant="h6"
                >
                  <label>Cidade:</label>
                  <input
                    style={{
                      textTransform: 'capitalize',
                      border: '1px #f16d2f solid',
                      borderRadius: '8px',
                      paddingLeft: '.5rem',
                      fontFamily: 'Roboto',
                      fontWeight: '500',
                      marginLeft: '.5rem',
                    }}
                    spellCheck="false"
                    name="Cidade"
                    // value={
                    //   selectedValueDelivery === 'Entrega'
                    //     ? pedidoSemCadastro.cidade
                    //     : 'Caucaia'
                    // }
                    // onChange={handleInputChange}
                    disabled={
                      selectedValueDelivery === 'Retirada'
                    }
                    {...register('cidade')}
                  />
                  <p>{errors.cidade?.message}</p>
                </Typography>

                <Typography
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                  }}
                  variant="h6"
                >
                  <label>Estado:</label>
                  <input
                    style={{
                      textTransform: 'capitalize',
                      border: '1px #f16d2f solid',
                      borderRadius: '8px',
                      paddingLeft: '.5rem',
                      fontFamily: 'Roboto',
                      fontWeight: '500',
                      marginLeft: '.5rem',
                    }}
                    spellCheck="false"
                    name="Estado"
                    // value={
                    //   selectedValueDelivery === 'Entrega'
                    //     ? pedidoSemCadastro.estado
                    //     : '61658-000'
                    // }
                    // onChange={handleInputChange}
                    disabled={
                      selectedValueDelivery === 'Retirada'
                    }
                    {...register('estado')}
                  />
                  <p>{errors.estado?.message}</p>
                </Typography>
              </Box>
            </Box>
          </Box>

          <Box className="cardFormOfPayment">
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-evenly',
                height: '100%',
                width: '100%',
              }}
            >
              <Box className="backgroundTitleFormPayment"></Box>
              <Typography
                variant="h6"
                className="editInformation"
              >
                Forma de Pagamento
              </Typography>
              <Box className="FormOfPayment">
                <Controller
                  name="formaDePagamento"
                  control={control}
                  render={({ field }) => (
                    <Box sx={{ padding: '10px 0 0 20px' }}>
                      <Box>
                        <label>
                          <input
                            type="radio"
                            {...field}
                            value="Credito"
                          />
                          Cartão de Crédito
                        </label>
                      </Box>
                      <Box>
                        <label>
                          <input
                            type="radio"
                            {...field}
                            value="Debito"
                          />
                          Cartão de Débito
                        </label>
                      </Box>
                      <Box>
                        <label>
                          <input
                            type="radio"
                            {...field}
                            value="Pix"
                          />
                          Pix
                        </label>
                      </Box>
                      <Box>
                        <label>
                          <input
                            type="radio"
                            {...field}
                            value="Dinheiro"
                          />
                          Dinheiro
                        </label>
                      </Box>
                    </Box>
                  )}
                />
                <Box>
                  <p>{errors.formaDePagamento?.message}</p>
                </Box>
              </Box>
            </Box>
          </Box>
          <Box sx={{ mb: 2 }}>
            {showAlert && (
              <Alert severity="success">
                <Typography>
                  Pedido realizado com sucesso. <br />
                  Muito obrigado!
                </Typography>
              </Alert>
            )}
          </Box>
          <Box className="totalPurchase">
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                width: '75%',
                height: '100%',
                alignItems: 'left',
                justifyContent: 'center',
                pl: 1,
                color: '#f9e9df',
              }}
            >
              <Typography
                style={{ fontSize: '12px', height: 'auto' }}
              >
                + Entrega: R$ 3,00
              </Typography>
              <Typography variant="h6">
                Total:{useFormat(calculateSubtotal(cart))}
              </Typography>
            </Box>
            <input
              className="btnSendRequest click"
              type="submit"
              value="Enviar"
            />
          </Box>
        </Box>
      </form>
    </Box>
  );
};

export default Order;
