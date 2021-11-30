import React, { useState } from 'react';
import styled from '@emotion/styled';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Heading7, Heading6, CaptionBold } from 'styles/typography';
import color from 'styles/colors';
import { mediaQuery, pxToVw } from 'styles/media';
import ButtonBasic from 'components/button';
import SnackBar from 'components/snack-bar';
import { useQueryString } from 'utils';
import { useGetSummaryExpense } from 'hooks/data/useExpense';
import Loading from 'pages/loading';
import List from './list';

const DetailWrap = styled.div`
  background: ${color.white};
  border-radius: 16px;
  padding: 28px 16px;
  margin: ${pxToVw(24)} 0 ${pxToVw(16)};
  position: relative;

  ${mediaQuery(640)} {
    margin: 24px 0 24px;
  }
`;

const Button = styled(ButtonBasic)`
  background-color: #f5f5ff;
  height: ${pxToVw(44)};

  p {
    color: ${color.primary};
  }

  ${mediaQuery(640)} {
    height: 44px;
  }
`;

const Icon = styled.span`
  width: 16px;
  height: 16px;
  margin-right: 4px;
  background: url('/images/Frame 893.svg') center no-repeat;
  background-size: contain;
`;

const Title = styled(Heading6)`
  display: inline-block;
  margin-bottom: 10px;
`;

const NoList = styled(Heading7)`
  color: ${color.grayscale.gray01};
`;

const Text = styled(Heading7)`
  color: ${color.white};
  span {
    color: ${color.green};
  }
`;

export default function Summary() {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const tripId = useQueryString().get('tripId');
  const { data } = useGetSummaryExpense(tripId || '');
  const currentUrl = window.location.href;

  const copyLinkText = `${currentUrl}
즐거운 여행 되셨나요?
정산, 잊지 않으셨죠?
  
디빗으로 정산내역을 확인해보세요.`;

  const handleCopy = () => {
    setOpenSnackbar(true);

    setTimeout(() => {
      setOpenSnackbar(false);
    }, 3000);
  };

  if (!data) {
    return <Loading />;
  }

  return (
    <>
      <DetailWrap>
        <Title>내 정산내역</Title>
        {data.detailList.length ? (
          data.detailList.map(({ nickName, profileImg, type, price }, i) => (
            <List key={i} nickName={nickName} profile={profileImg} kind={type} amount={price} />
          ))
        ) : (
          <NoList>주고 받을 내역이 없어요.</NoList>
        )}
        <CopyToClipboard text={copyLinkText}>
          <Button disabled={data.detailList.length < 1} onClick={handleCopy}>
            <>
              <Icon />

              <CaptionBold>공유하기</CaptionBold>
            </>
          </Button>
        </CopyToClipboard>
      </DetailWrap>
      {openSnackbar && (
        <SnackBar isOpen={openSnackbar}>
          <Text>정산 내역이 복사되었습니다.</Text>
        </SnackBar>
      )}
    </>
  );
}
