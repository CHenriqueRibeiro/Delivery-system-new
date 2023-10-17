import { Box, Radio, Typography } from '@mui/material';
import { useState } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DeliveryDiningOutlinedIcon from '@mui/icons-material/DeliveryDiningOutlined';
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined';
import CreditCardOutlinedIcon from '@mui/icons-material/CreditCardOutlined';
import PixOutlinedIcon from '@mui/icons-material/PixOutlined';
import { NavLink } from 'react-router-dom';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import InputMask from 'react-input-mask';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
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
    formaDeEntrega: yup.string().required(),
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
  })
  .required();

const Order = () => {
  const [open, setOpen] = useState(false);
  const { cart, calculateSubtotal } = useCarrinho();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [selectedValueDelivery, setSelectedValueDelivery] =
    useState(
      sessionStorage.getItem('selectedValueDelivery') ||
        'Entrega'
    );

  const [selectedValuePayment, setSelectedValuePayment] =
    useState(
      sessionStorage.getItem('selectedValuePayment') ||
        'Credito'
    );
  const [pedidoSemCadastro, setpedidoSemCadastro] =
    useState('');

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

  const handleChangePayment = (event) => {
    const { value } = event.target;
    setSelectedValuePayment(value);

    const savedData =
      JSON.parse(
        sessionStorage.getItem('pedido sem cadastro')
      ) || {};

    const updatedData = {
      ...savedData,
      formaDePagamento: value,
    };

    sessionStorage.setItem(
      'pedido sem cadastro',
      JSON.stringify(updatedData)
    );
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setpedidoSemCadastro({
      ...pedidoSemCadastro,
      [name]: value,
    });

    sessionStorage.setItem(
      'pedido sem cadastro',
      JSON.stringify({
        ...pedidoSemCadastro,
        [name]: value,
      })
    );
  };

  const createWhatsAppMessage = () => {
    const sessionStorageData = JSON.parse(
      sessionStorage.getItem('itensSelecionados')
    );

    if (sessionStorageData) {
      const pedidoSemCadastro = JSON.parse(
        sessionStorage.getItem('pedido sem cadastro')
      );

      if (!pedidoSemCadastro) {
        console.error(
          'Os dados do formulário não foram encontrados na sessionStorage.'
        );
        return;
      }

      const { nome, Telefone } = pedidoSemCadastro;

      let message = `Olá ${nome},\n\nTelefone: ${Telefone}\n\n---------------------------------------\nPedido:\n---------------------------------------\n`;

      const items = sessionStorageData.map(
        (item, index) => {
          return `Item ${index + 1}:\nSabor: ${
            item.sabor
          }\nQuantidade: ${
            item.quantidade
          }\nPreço: R$ ${item.valor.toFixed(2)}\n`;
        }
      );

      message += `CEP: ${pedidoSemCadastro.cep || ''}\n`;
      message += `Casa/Apto: ${
        pedidoSemCadastro.Numero || ''
      }\n`;
      message += `Rua: ${pedidoSemCadastro.rua || ''}\n`;
      message += `Complemento: ${
        pedidoSemCadastro.Referencia || ''
      }\n`;
      message += `Bairro: ${
        pedidoSemCadastro.Bairro || ''
      }\n`;
      message += `Cidade: ${
        pedidoSemCadastro.Cidade || ''
      }\n`;
      message += `Estado: ${
        pedidoSemCadastro.Estado || ''
      }\n`;

      message += `---------------------------------------\n`;
      message += `Forma de Pagamento: ${
        pedidoSemCadastro.formaDePagamento || ''
      }\n`;
      message += `Forma de Entrega: ${
        pedidoSemCadastro.formaDeEntrega || ''
      }\n`;
      message += `---------------------------------------\n`;

      message += `${items.join('\n')}\n`;

      const totalValue = calculateSubtotal(cart);
      message += `Valor Total: R$ ${totalValue.toFixed(2)}`;

      const formattedPhoneNumber = Telefone?.replace(
        /\s+/g,
        ''
      );

      const whatsappLink = `https://api.whatsapp.com/send?phone=55${formattedPhoneNumber}&text=${encodeURIComponent(
        message
      )}`;

      window.open(whatsappLink);
    }
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const onSubmit = (data) => {
    console.log(data);
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
                    value={pedidoSemCadastro.nome}
                    onChange={handleInputChange}
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
                    value={pedidoSemCadastro.Telefone}
                    onChange={handleInputChange}
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
                    value={
                      selectedValueDelivery === 'Entrega'
                        ? pedidoSemCadastro.cep
                        : '61658-000'
                    }
                    onChange={handleInputChange}
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
                    value={
                      selectedValueDelivery === 'Entrega'
                        ? pedidoSemCadastro.rua
                        : 'Alameda luiza'
                    }
                    onChange={handleInputChange}
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
                    value={
                      selectedValueDelivery === 'Entrega'
                        ? pedidoSemCadastro.numero
                        : '300 B'
                    }
                    onChange={handleInputChange}
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
                  <label>Ponto de Ref :</label>
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
                    name="Referencia"
                    value={
                      selectedValueDelivery === 'Entrega'
                        ? pedidoSemCadastro.referencia
                        : 'Prox.a Lagoa'
                    }
                    onChange={handleInputChange}
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
                    value={
                      selectedValueDelivery === 'Entrega'
                        ? pedidoSemCadastro.bairro
                        : 'Lagoa Do Banana'
                    }
                    onChange={handleInputChange}
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
                    value={
                      selectedValueDelivery === 'Entrega'
                        ? pedidoSemCadastro.cidade
                        : 'Caucaia'
                    }
                    onChange={handleInputChange}
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
                    value={
                      selectedValueDelivery === 'Entrega'
                        ? pedidoSemCadastro.estado
                        : '61658-000'
                    }
                    onChange={handleInputChange}
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
              {' '}
              <Box className="backgroundTitleFormPayment"></Box>
              <Typography
                variant="h6"
                className="editInformation"
              >
                Forma de Pagamento
              </Typography>
              <Box className="FormOfPayment">
                <Box
                  display={'flex'}
                  alignItems={'center'}
                  width={'100'}
                >
                  <Radio
                    checked={
                      selectedValuePayment === 'Credito'
                    }
                    onChange={handleChangePayment}
                    value="Credito"
                  />
                  <CreditCardOutlinedIcon />
                  <Typography variant="h6" sx={{ pl: 2 }}>
                    Cartão de Credito
                  </Typography>
                </Box>
                <Box display={'flex'} alignItems={'center'}>
                  <Radio
                    checked={
                      selectedValuePayment === 'Debito'
                    }
                    onChange={handleChangePayment}
                    value="Debito"
                  />
                  <CreditCardOutlinedIcon />
                  <Typography variant="h6" sx={{ pl: 2 }}>
                    Cartão de Debito
                  </Typography>
                </Box>
                <Box display={'flex'} alignItems={'center'}>
                  <Radio
                    checked={selectedValuePayment === 'Pix'}
                    onChange={handleChangePayment}
                    value="Pix"
                  />
                  <PixOutlinedIcon />
                  <Typography variant="h6" sx={{ pl: 2 }}>
                    Pix
                  </Typography>
                </Box>
                <Box display={'flex'} alignItems={'center'}>
                  <Radio
                    checked={
                      selectedValuePayment === 'Dinheiro'
                    }
                    onChange={handleChangePayment}
                    value="Dinheiro"
                  />
                  <AttachMoneyIcon />
                  <Typography variant="h6" sx={{ pl: 2 }}>
                    Dinheiro
                  </Typography>
                </Box>
              </Box>
            </Box>
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
              onClick={createWhatsAppMessage}
              value="Enviar"
            />
          </Box>
        </Box>
      </form>

      {/* <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        closeAfterTransition
      >
        <Fade in={open}>
          <Box id="modalCadastro">
            <Box id="modalContent">
              <Box className="wrapper">
                <Typography variant="h6">
                  Obrigado por sua compra
                </Typography>
                <Typography variant="h6">
                  Pedido Realizado
                </Typography>
                <svg
                  className="checkmark"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 52 52"
                >
                  {' '}
                  <Box
                    className="checkmark__circle"
                    cx="26"
                    cy="26"
                    r="25"
                  ></Box>{' '}
                  <path
                    className="checkmark__check"
                    fill="none"
                    d="M14.1 27.2l7.1 7.2 16.7-16.8"
                  ></path>
                </svg>
              </Box>

              <NavLink to="/" style={{ color: '#f9e9df' }}>
                <input
                  onClick={
                    (handleClose, createWhatsAppMessage)
                  }
                  className="btnCloseService click"
                  value="fechar"
                  style={{
                    textAlign: 'center',
                    color: 'white',
                    textTransform: 'capitalize',
                  }}
                />
              </NavLink>
            </Box>
          </Box>
        </Fade>
      </Modal> */}
    </Box>
  );
};

export default Order;
