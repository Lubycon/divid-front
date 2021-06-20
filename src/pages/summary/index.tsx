import React, { useState } from 'react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import { basicWrap } from 'styles/containers';
import { Heading3, Heading7, Body4 } from 'styles/typography';
import color from 'styles/colors';
import { mediaQuery, pxToVw } from 'styles/media';
import Button from 'components/button';
import SnackBar from 'components/snack-bar';
import { useQueryString } from 'utils';
import { useGetSummaryExpense } from 'hooks/data/useExpense';
import Loading from 'pages/loading';
import List from './list';

const Title = styled(Heading3)`
  margin: 8px 0;

  span {
    color: ${color.primary};
  }
`;

const Desc = styled(Body4)`
  color: ${color.grayscale.gray01};
`;

const DetailWrap = styled.div`
  background: ${color.white};
  border-radius: 16px;
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.08);
  padding: 24px 16px;
  margin: ${pxToVw(139)} 0 ${pxToVw(16)};
  position: relative;

  ${mediaQuery(640)} {
    margin: 170px 0 24px;
  }
`;

const CharSummary = styled.div`
  width: ${pxToVw(166)};
  height: ${pxToVw(126)};
  background: url('/images/img_calculation_detail.svg') no-repeat center;
  background-size: contain;
  position: absolute;
  top: ${pxToVw(-115)};
  left: ${pxToVw(80)};

  ${mediaQuery(640)} {
    width: 220px;
    height: 152px;
    top: -139px;
    left: 198px;
  }
`;

const NoList = styled(Heading7)`
  color: ${color.grayscale.gray01};
`;

const Label = styled(Heading7)`
  color: ${color.white};
`;

const Text = styled(Heading7)`
  span {
    color: ${color.primary};
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

  const handleClickCard = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (data.detailList.length < 1) {
      e.preventDefault();
    }
  };

  return (
    <div css={basicWrap}>
      <Title>
        <span>{data.nickName}</span> 님의 정산 내역
      </Title>
      <Desc>카드를 누르면 자세한 내역을 볼 수 있어요.</Desc>
      <Link to={`/detail?tripId=${tripId}`} onClick={handleClickCard}>
        <DetailWrap>
          <CharSummary />
          {data.detailList.length ? (
            data.detailList.map(({ nickName, profileImg, type, price }, i) => (
              <List key={i} nickName={nickName} profile={profileImg} kind={type} amount={price} />
            ))
          ) : (
            <NoList>주고 받을 내역이 없어요.</NoList>
          )}
        </DetailWrap>
      </Link>
      <CopyToClipboard text={copyLinkText}>
        <Button disabled={data.detailList.length < 1} onClick={handleCopy}>
          <Label>정산 내역 공유</Label>
        </Button>
      </CopyToClipboard>
      {openSnackbar && (
        <SnackBar isOpen={openSnackbar}>
          <Text>정산 내역이 복사되었습니다.</Text>
        </SnackBar>
      )}
    </div>
  );
}
