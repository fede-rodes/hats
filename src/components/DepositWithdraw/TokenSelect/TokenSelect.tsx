import Select from 'react-select';
import { Colors } from 'constants/constants';
import { IVault } from "types/types";
import "./index.scss";

interface IProps {
  vault: IVault
  onSelect: (pid: string) => void;
}

interface ITokenOptionProps {
  symbol: string;
  icon: string | undefined;
}

const TokenOption = ({ symbol, icon }: ITokenOptionProps) => {
  return (
    <div className="token-option-wrapper">
      <img src={icon} className="token-icon" alt="token icon" />
      <span>{symbol}</span>
    </div>
  )
}

export default function TokenSelect({ vault, onSelect }: IProps) {

  const handleSelect = (e) => {
    onSelect(e.value);
  }

  const selectStyles = {
    menu: (provided) => ({
      ...provided,
      border: `1px solid ${Colors.turquoise}`,
      borderRadius: "unset",
    }),
    option: (provided, state) => ({
      ...provided,
      fontWeight: state.isSelected ? "bold" : "",
      backgroundColor: state.isSelected ? `${Colors.darkBlue}` : `${Colors.fieldBlue}`,
      color: state.isSelected ? `${Colors.turquoise}` : "",
      height: "60px",
      display: "flex",
      "&:hover": {
        opacity: "0.8",
      }
    }),
    control: () => ({
      border: `1px solid ${Colors.turquoise}`,
      display: "flex",
      color: `${Colors.white}`,
      height: "60px",
    }),
    menuList: () => ({
      padding: "unset",
    })
  }

  return (
    <div className="token-select-wrapper">
      {vault.multipleVaults ? (
        <Select
          styles={selectStyles}
          isSearchable={false}
          className="select-tokens"
          onChange={handleSelect}
          options={vault.multipleVaults?.map(vault => {
            return (
              {
                value: vault.pid,
                label: <TokenOption symbol={vault.stakingTokenSymbol} icon={vault.description?.["project-metadata"].tokenIcon} />
              }
            )
          })} />
      ) : (
        <div className="token-icon-wrapper">
          <img src={vault.description?.["project-metadata"].tokenIcon} className="token-icon" alt="token icon" />
          {vault.stakingTokenSymbol}
        </div>
      )}
    </div>
  )
}
